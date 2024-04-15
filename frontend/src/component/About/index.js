import "./style.scss";

const About = () => {
  return (
    <div className="about_wrapper">
      <div className="about_title">Welcome to About Page</div>
      <div className="about_title_2">- By Rishabh Verma</div>
      <div className="frontend_section">
        <dl>
          <dt className="about_title">Frontend</dt>
          <dd>
            <p>
              <strong>UI Library: </strong> React
            </p>
            <p>
              <strong>Npm Packages: </strong> antd, axios, chart.js, jwt-decode,
              leaflet, sass, @react-oauth/google, mongoose and more.
            </p>
            <p>
              <strong>GeoJSon dataset : </strong>{" "}
              <a href="https://geojson.io/#map=2.51/-6.33/-0.92">
                https://geojson.io/#map=2.51/-6.33/-0.92
              </a>
            </p>
            <p>
              <dl>
                <dt>Description</dt>
                <dd>
                  There are multiple packages used for creating this project.
                  Starting from React library to using sass, antd and css to
                  make the Ui structure. Google auth is used to make the
                  authentication flow using Google. There are basically two
                  pages in the app. 'Dashboard' and 'About' pages are the
                  landing and about app pages respectively. For the map
                  population, GeoJson dataset has been taken. ChartJs library is
                  used for chart. OpenStreet is the tile provider for the map.
                </dd>
              </dl>
            </p>
            <p>
              <dl>
                <dt>What could be done better?</dt>
                <dd>
                  The html is not fully broken down in components. Single
                  purpose function can be used to make the code more readable.
                  Comments can be provided for easy understanding and more.
                </dd>
              </dl>
            </p>
          </dd>
        </dl>
        <dl>
          <dt className="about_title">Backend</dt>
          <dd>
            <p>
              <strong>Backend Framework: </strong> Node, Express
            </p>
            <p>
              <strong>Npm Packages: </strong> axios, bcryptjs, jsonwebtoken,
              mongoose and more.
            </p>
            <p>
              <strong>Data Source : </strong>{" "}
              <a href="https://rapidapi.com/axisbits-axisbits-default/api/covid-19-statistics">
                https://rapidapi.com/axisbits-axisbits-default/api/covid-19-statistics
              </a>
            </p>
            <p>
              <dl>
                <dt>Description</dt>
                <dd>
                  There are multiple packages used for creating this project.
                  Starting from backend framework, Node and Express is used. For
                  Database NoSql has been used and MongoDb is the database.
                  Separate folders for middleware, routes, databse and models
                  has been created. Various libraries have been used to develop
                  this project.
                </dd>
              </dl>
            </p>
            <p>
              <dl>
                <dt>What could be done better?</dt>
                <dd>
                  Not able to transfer the logic part to the controller section.
                  More functions can be made to rectify and simplify the
                  project.
                </dd>
              </dl>
            </p>
          </dd>
        </dl>
      </div>
      <p>Any feedback will be welcomed.</p>

      <div className="note">
        Some of the data will not be populated on map as there are not much data
        on geoJSON to populate wrt countries. As latest data was not available
        so I have used 2022 year as the covid details year.Number of deaths,
        active and confirmed cases are taken into consideration. Some of the
        calculation is not correct which can be corrected with more time and
        efforts.
      </div>
    </div>
  );
};

export default About;
