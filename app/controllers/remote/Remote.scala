package controllers.remote

import
  play.api.{ libs, mvc },
    libs.{ json, iteratee },
      json.JsValue,
      iteratee.Enumerator,
    mvc.{ Result, ResponseHeader, Action, Controller, WebSocket }

import
  models.{ core, remote },
    remote.RemoteInstance,
    core.Util.usingSource

object Remote extends Controller {

  def index = Action {
    implicit request =>
      Ok(views.html.remote.index())
  }

  def client(usernameOpt: Option[String]) = Action {
    implicit request =>
      usernameOpt map (
        username => Ok(views.html.remote.client(username))
      ) getOrElse (
        Redirect(routes.Remote.index()).flashing(
          "error" -> "Please choose a valid username."
        )
      )
  }

  def embedded = Action {
    implicit request =>
      Ok(views.html.remote.embedded())
  }

  private lazy val agentModelStr = usingSource(_.fromURL(getClass.getResource("/js/tortoise/agentmodel.js")))(_.mkString)

  def agentModel = Action {
    implicit request => OkJS(agentModelStr)
  }

  def handleSocketConnection(username: String, room: Int = 0) = WebSocket.tryAccept[JsValue] {
    implicit request => RemoteInstance.join(username, room)
  }

  private def OkJS(js: String) =
    Result(
      header = ResponseHeader(200, Map(CONTENT_TYPE -> "text/javascript")),
      body   = Enumerator(js.getBytes(play.Play.application.configuration.getString("application.defaultEncoding")))
    )
}
