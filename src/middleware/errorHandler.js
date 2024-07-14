const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.message === 'Unauthorized') {
        return res.status(401).json({ message: 'Sorry, unauthorized! please provide a valid token' });
    }

    res.status(500).json({ message: 'Sorry, something went wrong!' });
};

export default errorHandler;