const notFoundErrorHandler = (err, req, res, next) => {
    if (req.body === "") { res.body === "PROBLEMS!"; console.log("no body information was found...") }

    if (err.name === 'NotFoundError') {
        return res.status(404).json({ message: err.message });
    }

    if (err.name === 'Error') {
        return res.status(500).json({ message: `Internal error: ${err.message}` });
    }

    console.log("An error occured, please check your request...");

    next(err);
}

export default notFoundErrorHandler;