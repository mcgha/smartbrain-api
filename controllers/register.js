const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password);
    if (!email || !name || !password) {
        return res.status(400).json('Incorrect form submission');
    } //if we return, function exits, rest of code wont run
    db.transaction(trx => { //when you do have more than 1 action
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert ({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit) //if everything works complete transaction
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to join'))
}

module.exports = {
    handleRegister
};