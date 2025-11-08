import io.gatling.core.Predef._
import io.gatling.http.Predef._
class CatalogSimulation extends Simulation {
  val base = System.getProperty("BASE_URL", "http://localhost")
  val httpConf = http.baseUrl(base)
  val scn = scenario("ListProducts")
    .exec(http("list").get("/api/products").check(status.is(200)))
  setUp(scn.inject(rampUsers(200).during(30))).protocols(httpConf)
}
