const express = require("express");
const app = express();
const request = require('request')
const axios = require('axios')
const DiscordEasyDashboard = require('./DiscordEasyDashboard')
const ejs = require('ejs');

app.engine('.ejs', ejs.__express);
app.set('views', __dirname);


DiscordEasyDashboard.System.pushApp(app)

DiscordEasyDashboard.Dashboard.settings({
  clientID: "712193538716336149",
  clientSecret: "hO6t8-eNXwP-qsndW0VR_Wp2gonjSDkB",
  callbackUrl: "https://ring-stitch-seataadasf.glitch.me/callback",
  scope: "identify guilds", 
  botToken: "NzEyMTkzNTM4NzE2MzM2MTQ5.XsN_6w.D8mkzvmuOtaHHUo4157maFv-A1s",
  loginPath: "/login",
  authorizeUrlPrompt: true
})

 

app.get("/", async function(req,res)  {
DiscordEasyDashboard.Dashboard.fileRender(res, "Dashboard-Files/index", "ejs", {
    checkLogin: DiscordEasyDashboard.Dashboard.savedUserCheck(req, res),
    getUser: JSON.parse(await DiscordEasyDashboard.Dashboard.getUserInfo(req, res))
  })
})


app.get("/dashboard/guilds", DiscordEasyDashboard.Dashboard.checkLogin , async(req,res) => {
DiscordEasyDashboard.Dashboard.fileRender(res, "Dashboard-Files/dashboard", "ejs", {
    getUser: JSON.parse(await DiscordEasyDashboard.Dashboard.getUserInfo(req, res)),
    getGuilds: JSON.parse(await DiscordEasyDashboard.Dashboard.getUserGuilds(req, res))
  })
})

app.get("/login", async(req, res) => {
  res.redirect(DiscordEasyDashboard.Dashboard.getBotLink())
})


app.get("/callback", async(req,res) => {
  DiscordEasyDashboard.Dashboard.callbackGet(req, res, "/")
})

app.get("/logout", async(req, res) => {
  DiscordEasyDashboard.Dashboard.userLogout(req, res, "/")
})

app.listen(process.env.PORT)
