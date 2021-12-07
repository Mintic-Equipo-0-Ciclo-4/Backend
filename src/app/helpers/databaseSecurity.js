const verifyRequired = (data, fields) => {
	for (let field of fields) {
		if (!data[field]) return { message: `Missing or null field  ${field}`, nullField: field, status: 400 };
	}
};

const verifyUnique = async (data, fields, model) => {
	for (let field of fields) {
		let conflict = await model.findOne({ [field]: { $regex: String(data[field]), $options: "i" } });
		if (conflict) return { message: `Field ${field} already exists`, conflictField: field, status: 409 };
	}
};

module.exports = { verifyUnique, verifyRequired };
