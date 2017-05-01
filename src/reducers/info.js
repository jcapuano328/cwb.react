let defaultInfo = {
    version: '1.0.0',
    releasedate: new Date(2017,3,25,14,0,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
