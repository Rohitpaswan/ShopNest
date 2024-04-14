const createCategories = async (req, res, next) => {
  try {
    const data = req.body;
  
    res.status(200).json({
      response: "Successfully created",
      payload: data,
    });
  } catch (e) {
    res.status(404).json({ response: "Error creating" });
    console.log(e);
  }
};

module.exports = {createCategories};