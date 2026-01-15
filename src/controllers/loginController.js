const Login = require('../models/LoginModel');

exports.index = async (req, res) => {
    if (req.session.user) return res.render('login-logado')
    res.render('login')
}

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body)
        await login.register()
        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(() => res.redirect('/login'))
            return
        }
        req.flash('success', 'Usuário criado com sucesso!')
        req.session.save(() => res.redirect('/login'))
    } catch (e) {
        console.log(e)
        return res.render('404')
    }
}

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body)
        await login.login()
        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(() => res.redirect('/login'))
            return
        }
        req.session.user = login.user
        req.flash('success', 'Login feito com sucesso!')
        req.session.save(() => res.redirect('/'))
    } catch (e) {
        console.log(e)
        return res.render('404')
    }
}

exports.logout = async (req, res) => {
    req.session.destroy()
    res.redirect('/login')
}