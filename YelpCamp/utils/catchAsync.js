module.exports = func => {
    return (req,res,next) => {
        func(req,res,next).catch(next);            // if it catches any error then it passes into next
    }
}