exports.findDocument = async (Model, data) => {
    return await Model.findOne(data);
}

exports.storeData = async (Model, data) => {
    return await Model.create(data)
}

exports.findDocuments = async (Model, query) => {
    return await Model.find(query);
}

exports.findList = async (Model, query, options) => {
    const { skip, limit } = options;
    return await Model.find(query).skip(skip).limit(limit);
}

exports.updateDocument = async (Model, query, update) => {
    try {
        return await Model.findByIdAndUpdate(query, update);
    } catch (error) {
        console.log(error)
    }
}

exports.deleteDocument = async (Model, query) => {
    return await Model.deleteOne(query);
}
