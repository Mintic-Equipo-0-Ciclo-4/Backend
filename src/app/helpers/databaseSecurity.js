const verifyRequired = (data, fields) => {
	for (let field of fields) {
		if (!data[field]) return { message: `Missing or null field  ${field}`, nullField: field, status: 400, error: [field] };
	}
};

const verifyUnique = async (data, fields, model, id = null) => {
	for (let field of fields) {
		let conflict = await model.findOne({
			$and: [{ [field]: { $regex: String(data[field]), $options: "i" } }, { [id]: { $ne: data[id] } }],
		});
		console.log(`Da error si ${field} == ${data[field]} y si ${id} != ${data[id]}`);
		if (conflict) return { message: `Field ${field} already exists`, conflictParam: field, status: 409 };
	}
};

module.exports = { verifyUnique, verifyRequired };
