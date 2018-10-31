**Get Planets**
----
  Returns json data about all planets or filtered by name.

* **URL**

  /planets/
  /planets/?name=[name]

* **Method:**

  `GET`
  
*  **URL Params**
  `name=[string]`

   **Required:**
 
  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ _id : ˜5bd917bb9672ef14abb151fa˜, name : "Dagobah",  terrain: "swamp, jungles", climate: "murky", numberFilms: 3}]`

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

**Post Planet**
----
  Post a single planet.

* **URL**

  /planets/

* **Method:**

  `POST`

* **Data Params**

  `{name:[string], climate:[string], terrain:[string]}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ _id : ˜5bd917bb9672ef14abb151fa˜, name : "Dagobah",  terrain: "swamp, jungles", climate: "murky", numberFilms: 3}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `Planet already registered.`

  OR

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `"[field]" is required`

**Delete Planet**
----
  Delete a single planet.

* **URL**

  /planets/:id

* **Method:**

  `DELETE`

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
