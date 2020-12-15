const _ = require("ssv-utils");

const findById = async (model, { _id, select = "-password -refresh_token" }) => {
  _id = _.isArray(_id) ? _id : _id.toString();
  if (!_.isObjectId(_id)) throw new Error(`400::invalid ${_id || "objectId"}`);
  let condition = { _id: { $in: _id }, deleted_at: null };

  let excute = null;
  if (_.isArray(_id)) {
    condition._id = { $in: _id };
    excute = await model.find(condition).select(select);
  } else {
    excute = await model.findOne(condition).select(select);
  }

  if (!excute || (_.isArray(excute) && excute.length < 1)) throw new Error(`204::no record for ${_id || "objectId"}`);

  return excute;
};

const remove = async (model, { _id, removeFromDb = false, deleted_at = Date.now(), ENP_APP = process.env.NODE_ENV }) => {
  let excute = await findById(model, { _id });
  if (excute.deleted_at !== null) {
    return true;
  }

  if (removeFromDb || NODE_ENV === "development") {
    excute = await model.findByIdAndDelete(_id);
  } else {
    excute.deleted_at = deleted_at;
    excute = await excute.save();
  }
  if (!excute) throw new Error("can remove");
  return true;
};

const find = async (
  model,
  {
    throw_error = false,
    many = true,
    deleted_at = null,
    sort = { created_at: 1 },
    paginate = { page: 1, limit: 20, useSliceFunc: false, paginate: false },
    _id,
    condition = {},
    populate,
    select,
    search = { key: [], key_word: null, options: "i" },
    error_code = 204,
  }
) => {
  if (!model) throw new Error("model is requried in find function");
  condition = { deleted_at: deleted_at, ...condition };

  // search function.
  if (search.key.length > 0) {
    if (!search.key_word) throw new Error("400::search query is requried");
    for (let i = 0; i < search.key.length; i++) {
      condition[search.key[i]] = { $regex: search.key_word, $options: "i" };
    }
  }

  let result = null;
  if (!many) {
    if (_id) {
      if (!_.validateObjectId(_id)) throw new Error(`400::invalid ${_id || "objectId"}`);
      condition._id = _id.toString();
    }
    // Excute Function
    result = model.findOne(condition);
  } else {
    result = model.find(condition);
  }
  // condition...,selection..
  if (populate) result = result.populate(populate);
  if (select) result = result.select(select);
  if (sort) result = result.sort(sort);

  if (paginate.paginate) {
    paginate.limit = parseInt(paginate.limit) || false;
    paginate.page = parseInt(paginate.page) || false;

    if (!paginate.limit || !paginate.page) throw new Error("400::limit and page should be type of number");
    let skip = 0;
    if (paginate.page > 1) {
      skip = paginate.limit * paginate.page - paginate.limit;
    }

    result = result.skip(skip).limit(paginate.limit);
  }

  if (throw_error) {
    let check = await result;
    if ((_.isArray(check) && check.length < 1) || !check) {
      throw new Error(error_code + "::no data found");
    }
  }

  return result;
};

const findExist = async (model, { condition = {}, key }) => {
  condition = { deleted_at: null, ...condition };
  const excute = await model.findOne(condition);
  if (excute) throw new Error(`400::${key} already exist`);
};

const Mongo = {
  findById,
  remove,
  find,
  findExist,
};

module.exports = Mongo;
