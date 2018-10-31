**Get Planet**
----
  Returns json data about a single planet.

* **URL**

  /planets/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ _id : ˜5bd917bb9672ef14abb151fa˜, name : "Dagobah",  terrain: "swamp, jungles", climate: "murky", numberFilms: 3}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `Planet not found ID: <id>`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Access danied. No token provided.`
