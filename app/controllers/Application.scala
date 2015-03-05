package controllers

import
  play.api.{ Logger, mvc },
    mvc.{ Action, Controller }

import
  play.api.libs.json.Json

import
  models.core.ModelsLibrary.{ allModels, prettyFilepath }

object Application extends Controller {

  def index = Action {
    implicit request =>
      Ok(views.html.application.index())
  }

  def modelList = Action {
    implicit request =>
      Ok(Json.stringify(Json.toJson(allModels.map(prettyFilepath))))
  }

}
