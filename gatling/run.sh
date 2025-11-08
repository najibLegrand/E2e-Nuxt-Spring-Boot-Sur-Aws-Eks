#!/usr/bin/env bash
set -euo pipefail
BASE_URL=${1:-http://localhost}
mvn -q -f gatling/pom.xml -Dgatling.simulationClass=CatalogSimulation -DBASE_URL=$BASE_URL gatling:test
