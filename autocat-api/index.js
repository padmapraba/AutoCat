const express = require("express");

const { Client } = require("pg");

const app = express();
const port = 8000;

let pg = null;

async function initPostgres() {
  pg = new Client({
    user: "postgres",
    host: "localhost",
    database: "autocat",
    port: 5432, // postgres default
  });
  await pg.connect();
  const res = await pg.query("SELECT NOW()");
  console.log("query test", res.rows);
}

app.get("/", (req, res) => {
  res.json({ test: "hello" });
});

const searchDefaults = {
  priceMin: 1000,
  priceMax: 100000,
};

app.get("/cars", async (req, res) => {
  try {
    //    , body, engine, car_has_body, fuel, runs_on, car_contains_engine

    const filters = {
      model: req.query.model,
      make: req.query.make,
      priceMin: req.query.priceMin,
      priceMax: req.query.priceMax,
      safety: req.query.safety,
      fuelType: req.query.fuelType,
      doorsMin: req.query.doorsMin,
      seatsMin: req.query.seatsMin,
      doorsMax: req.query.doorsMax,
      seatsMax: req.query.seatsMax,
      cityMpgMin: req.query.cityMpgMin,
      cityMpgMax: req.query.cityMpgMax,
      highwayMpgMin: req.query.highwayMpgMin,
      highwayMpgMax: req.query.highwayMpgMax,
      driveWheel: req.query.driveWheel,
      style: req.query.style,
    };

    let query = `SELECT make, model, price, safety_rating, image_url FROM car`;
    let where = [];
    let whereOr = [];
    let from = {};

    if (
      filters.doorsMin ||
      filters.doorsMax ||
      filters.seatsMin ||
      filters.seatsMax ||
      filters.driveWheel ||
      filters.style
    ) {
      from["body"] = true;
      from["car_has_body"] = true;
    }

    if (
      filters.fuelType ||
      filters.highwayMpgMax ||
      filters.highwayMpgMin ||
      filters.cityMpgMax ||
      filters.cityMpgMin
    ) {
      from["fuel"] = true;
      from["runs_on"] = true;
    }

    if (filters.make) {
      where.push(`make = '${filters.make}'`);
    }

    if (filters.priceMin) {
      where.push(`price > ${filters.priceMin || searchDefaults.priceMin}`);
    }

    if (filters.priceMax) {
      where.push(`price < ${filters.priceMax || searchDefaults.priceMax}`);
    }

    if (filters.safety) {
      where.push(`safety_rating >= ${filters.safety || searchDefaults.safety}`);
    }

    if (filters.fuelType) {
      where.push(`car.car_id = runs_on.car_id`);
      where.push(`runs_on.fuel_id = fuel.fuel_id`);
      where.push(`fuel.fuel_type = '${filters.fuelType}'`);
    }

    if (filters.highwayMpgMin) {
      where.push(`car.car_id = runs_on.car_id`);
      where.push(`runs_on.fuel_id = fuel.fuel_id`);
      where.push(`fuel.highway_mpg >= ${filters.highwayMpgMin}`);
    }

    if (filters.highwayMpgMax) {
      where.push(`car.car_id = runs_on.car_id`);
      where.push(`runs_on.fuel_id = fuel.fuel_id`);
      where.push(`fuel.highway_mpg <= ${filters.highwayMpgMax}`);
    }

    if (filters.cityMpgMin) {
      where.push(`car.car_id = runs_on.car_id`);
      where.push(`runs_on.fuel_id = fuel.fuel_id`);
      where.push(`fuel.city_mpg >= ${filters.cityMpgMin}`);
    }

    if (filters.cityMpgMax) {
      where.push(`car.car_id = runs_on.car_id`);
      where.push(`runs_on.fuel_id = fuel.fuel_id`);
      where.push(`fuel.city_mpg <= ${filters.cityMpgMax}`);
    }

    if (filters.doorsMin) {
      where.push(`car.car_id = car_has_body.car_id`);
      where.push(`car_has_body.body_id = body.body_id`);
      where.push(`body.doors >= ${filters.doorsMin}`);
    }

    if (filters.doorsMax) {
      where.push(`car.car_id = car_has_body.car_id`);
      where.push(`car_has_body.body_id = body.body_id`);
      where.push(`body.doors <= ${filters.doorsMax}`);
    }

    if (filters.seatsMin) {
      where.push(`car.car_id = car_has_body.car_id`);
      where.push(`car_has_body.body_id = body.body_id`);
      where.push(`body.seats >= ${filters.seatsMin}`);
    }

    if (filters.seatsMax) {
      where.push(`car.car_id = car_has_body.car_id`);
      where.push(`car_has_body.body_id = body.body_id`);
      where.push(`body.seats <= ${filters.seatsMax}`);
    }

    if (filters.style) {
      where.push(`car.car_id = car_has_body.car_id`);
      where.push(`car_has_body.body_id = body.body_id`);
      const options = filters.style.split(",");
      let orQuery = `(body.body_style = '${options[0]}'`;
      if (options.length > 1) {
        for (let i = 1; i < options.length; i++) {
          orQuery += ` OR body.body_style = '${options[i]}'`;
        }
        orQuery += ")";
        whereOr.push(orQuery);
      } else {
        orQuery += ")";

        where.push(orQuery);
      }
    }

    if (filters.driveWheel) {
      where.push(`car.car_id = car_has_body.car_id`);
      where.push(`car_has_body.body_id = body.body_id`);
      const options = filters.driveWheel.split(",");
      let orQuery = `(body.drive_wheel = '${options[0]}'`;

      if (options.length > 1) {
        for (let i = 1; i < options.length; i++) {
          orQuery += ` OR body.drive_wheel = '${options[i]}'`;
        }
        orQuery += ")";
        whereOr.push(orQuery);
      } else {
        orQuery += ")";
        where.push(orQuery);
      }
    }

    const fromTables = Object.keys(from);
    if (fromTables.length > 0) {
      query += ", " + fromTables.join(" , ");
    }

    if (where.length > 0) {
      query += " WHERE " + where.join(" AND ");
    }

    if (whereOr.length > 0) {
      query += " AND ";
    }

    console.log("final DB query: ", query);

    const dbResult = await pg.query(query);
    const cars = dbResult.rows;
    return res.json({
      cars,
    });
  } catch (error) {
    console.error("res error: ", error);
  }
});

app.listen(port, async () => {
  await initPostgres();
  console.log(`autocat-api running on port ${port}`, port);
});
