# PE - Performance Evaluator Module

## Read me

### Requirements

Make sure you have Node.js version 10.16.0 LTS installed. Sequelize does not work with the latest version, 12.4.0 Current.

This module uses the following dependencies:
 - cors version 2.8.5;
 - express version 4.17.1;
 - mysql2 version 1.6.5;
 - sequelize version 5.8.7

It also makes use of the Sequelize CLI (Command-Line Interface), which can either be installed globally or locally.
Install CLI globally: npm install -g sequelize-cli
Install CLI locally: npm install --save sequelize-cli

The CLI is **NOT** required for running the module.

 For development purposes and local usage, the module uses the following development dependencies:
 - env-cmd version 9.0.2;
 - nodemon version 1.19.1

Make sure to be running a MySQL server before using this module

 ### Installation

 1. Clone the repository;
 2. Open the "current" folder, then the "server" folder and install the required dependencies using the console command **npm install**
   - If you're running the module locally, make sure to install the development dependencies specified above using the following commands:
   - **npm install env-cmd --save-dev**
   - **npm install nodemon --save-dev**
   - On package.json, write the following script under "scripts": "dev": "env-cmd -f ./config/dev.env nodemon src/app.js"
   - Run using the command **npm run dev** inside of the "server" folder

### API

<br><br>

### answerTypeRouter

#### GET - Read answer types

##### Request

GET /api/answerType<br>
GET /api/answerType?id=VALUE<br>
GET /api/answerType?type=VALUE<br>
Accept: application/json
<br><br>
#### Response example:

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Content-Type: application/json; charset=utf-8<br>
Content-Length: 101<br>
ETag: W/"65-GWzHAWfPUNM1vJBj0ZltsHwpOX4"<br>
Date: Wed, 12 Jun 2019 10:32:16 GMT<br>
Connection: keep-alive
   
    {
        "id": VALUE,
        "type": VALUE
    }

##### Query Parameters


<table>
  <tr>
    <th>Parameter</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>No</td>
    <td>Filter by answer type id</td>
  </tr>
  <tr>
    <td>type</td>
    <td>No</td>
    <td>Filter by answer types that correspond to the string received</td>
  </tr>
</table>

##### Transfer Payload

None

##### Return Payload

Example:


    {
        "id": 1,
        "type": "The First type"
    },
    {
        "id": 2,
        "type": "The Second type"
    },
    {
        "id": 3,
        "type": "The Third type"
    }


##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>Answer type found</td>
  </tr>
  <tr>
    <td>404</td>
    <td>Answer type not found</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### POST - Create a new answer type

##### Request

POST /api/answerType<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Content-Type: text/html; charset=utf-8<br>
Content-Length: 10<br>
ETag: W/"a-qdHkDDj9jcJ7dIrBCJjRwYYs0KA"<br>
Date: Wed, 12 Jun 2019 10:59:17 GMT<br>
Connection: keep-alive

    VALUE

##### Query Parameters

None

##### Transfer Payload

<table>
  <tr>
    <th>Name</th>
    <th>Required</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Yes</td>
    <td>String</td>
    <td>Name of the answer type (Example: Multiple answer)</td>
  </tr>
</table>

##### Return Payload

Example:

    A New type

##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>201</td>
    <td>Answer type created</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>409</td>
    <td>Answer type already exists</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### PATCH - Update answer type

##### Request

PATCH /api/answerType<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Date: Wed, 12 Jun 2019 11:07:24 GMT<br>
Connection: keep-alive<br>
Content-Length: 0

##### Query Parameters

None

##### Transfer Payload

<table>
  <tr>
    <th>Name</th>
    <th>Required</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Yes</td>
    <td>Integer</td>
    <td>ID of the answer type</td>
  </tr>
  <tr>
    <td>type</td>
    <td>Yes</td>
    <td>String</td>
    <td>New answer type</td>
  </tr>
</table>

##### Return Payload

None

##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>Answer type updated</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>409</td>
    <td>Answer type already exists</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### DELETE - Delete answer type

##### Request

DELETE /api/answerType?id=VALUE<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Date: Wed, 12 Jun 2019 11:44:26 GMT<br>
Connection: keep-alive

##### Query Parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Yes</td>
    <td>ID of the answer type to delete</td>
  </tr>
</table>

##### Transfer Payload

None

##### Return Payload

None

##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td>Answer type deleted</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

<br><br>

### evaluationCycleRouter

#### GET - Read evaluation cycles

##### Request

GET /api/evaluationCycle<br>
GET /api/evaluationCycle?id=VALUE<br>
GET /api/evaluationCycle?startDate=VALUE<br>
GET /api/evaluationCycle?endDate=VALUE<br>
GET /api/evaluationCycle?startDate=VALUE&endDate=VALUE<br>
Accept: application/json
<br><br>
#### Response example:

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Content-Type: application/json; charset=utf-8<br>
Content-Length: 175<br>
ETag: W/"af-66pDjjXU1rOXvn/aunXZ2lffk6Y"<br>
Date: Wed, 12 Jun 2019 11:50:26 GMT<br>
Connection: keep-alive

Example:
   
    {
        "id": 1,
        "start_date": "2020-03-01T00:00:00.000Z",
        "end_date": "2020-03-30T23:00:00.000Z"
    },
    {
        "id": 3,
        "start_date": "2020-03-31T23:00:00.000Z",
        "end_date": "2020-04-29T23:00:00.000Z"
    }

##### Query Parameters


<table>
  <tr>
    <th>Parameter</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>No</td>
    <td>Filter by evaluation cycle id</td>
  </tr>
  <tr>
    <td>startDate</td>
    <td>No</td>
    <td>Filter by the cycle's start date</td>
  </tr>
  <tr>
    <td>endDate</td>
    <td>No</td>
    <td>Filter by the cycle's end date</td>
  </tr>
</table>

##### Transfer Payload

None

##### Return Payload

Example:


    {
        "id": 1,
        "start_date": "2020-03-01T00:00:00.000Z",
        "end_date": "2020-03-30T23:00:00.000Z"
    },
    {
        "id": 3,
        "start_date": "2020-03-31T23:00:00.000Z",
        "end_date": "2020-04-29T23:00:00.000Z"
    }


##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>Evaluation cycle found</td>
  </tr>
  <tr>
    <td>404</td>
    <td>Evaluation cycle not found</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### POST - Create a new evaluation cycle

##### Request

POST /api/evaluationCycle<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Content-Type: text/html; charset=utf-8<br>
Content-Length: 113<br>
ETag: W/"71-ucE8L9ALfMZVsdN2RDNBcwSRp/w"<br>
Date: Wed, 12 Jun 2019 13:58:05 GMT<br>
Connection: keep-alive

    Start date: VALUE
    End date: VALUE

##### Query Parameters

None

##### Transfer Payload

<table>
  <tr>
    <th>Name</th>
    <th>Required</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>startDate</td>
    <td>Yes</td>
    <td>String</td>
    <td>Date using the following format: mm/dd/yyyy (Example: 12/31/2019)</td>
  </tr>
  <tr>
    <td>endDate</td>
    <td>Yes</td>
    <td>String</td>
    <td>Date using the following format: mm/dd/yyyy (Example: 12/31/2019)</td>
  </tr>
</table>

##### Return Payload

Example:

    Start date: Fri May 01 2020 00:00:00 GMT+0100 (GMT+01:00)
    End date: Sat May 30 2020 00:00:00 GMT+0100 (GMT+01:00)

##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>201</td>
    <td>Evaluation cycle created</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>409</td>
    <td>A cycle with those exact dates already exists</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### PATCH - Update evaluation cycle

##### Request

PATCH /api/evaluationCycle<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Date: Wed, 12 Jun 2019 14:23:57 GMT<br>
Connection: keep-alive<br>
Content-Length: 0

##### Query Parameters

None

##### Transfer Payload

<table>
  <tr>
    <th>Name</th>
    <th>Required</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Yes</td>
    <td>Integer</td>
    <td>ID of the evaluation cycle</td>
  </tr>
  <tr>
    <td>startDate</td>
    <td>Yes</td>
    <td>String</td>
    <td>New cycle start date</td>
  </tr>
  <tr>
    <td>endDate</td>
    <td>Yes</td>
    <td>String</td>
    <td>New cycle end date</td>
  </tr>
</table>

##### Return Payload

None

##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>Evaluation cycle updated</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>409</td>
    <td>A cycle with those exact dates already exists</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### DELETE - Delete evaluation cycle

##### Request

DELETE /api/evaluationCycle?id=VALUE<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Date: Wed, 12 Jun 2019 14:27:38 GMT<br>
Connection: keep-alive

##### Query Parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Yes</td>
    <td>ID of the evaluation cycle to delete</td>
  </tr>
</table>

##### Transfer Payload

None

##### Return Payload

None

##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td>Evaluation cycle deleted</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>
<br><br>

### quantObjectiveTypeRouter



#### GET - Read Quantitative Objective Types

##### Request

GET /api/objectiveType<br>
GET /api/objectiveType?id=VALUE<br>
GET /api/objectiveType?type=VALUE<br>
Accept: application/json
<br><br>
#### Response example:

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Content-Type: application/json; charset=utf-8<br>
Content-Length: 30<br>
ETag: W/"1e-Pk2acI691+rR+wOY4nj/9WunURE"<br>
Date: Wed, 12 Jun 2019 14:56:36 GMT<br>
Connection: keep-alive

Example:
   
    {
      "id": VALUE,
      "type": VALUE
    }

##### Query Parameters


<table>
  <tr>
    <th>Parameter</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>No</td>
    <td>Filter by quantitative objective type id</td>
  </tr>
  <tr>
    <td>type</td>
    <td>No</td>
    <td>Filter by the objective type</td>
  </tr>
</table>

##### Transfer Payload

None

##### Return Payload

Example:


    {
        "id": 2,
        "type": "The New type"
    },
    {
        "id": 1,
        "type": "Updated type"
    }


##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>Objective type found</td>
  </tr>
  <tr>
    <td>404</td>
    <td>Objective type not found</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### POST - Create a quantitative objective type

##### Request

POST /api/objectiveType<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Content-Type: text/html; charset=utf-8<br>
Content-Length: 12<br>
ETag: W/"c-skDWhQR/8dsv+EPcs4/6zeNCVGo"<br>
Date: Wed, 12 Jun 2019 15:01:05 GMT<br>
Connection: keep-alive

    VALUE

##### Query Parameters

None

##### Transfer Payload

<table>
  <tr>
    <th>Name</th>
    <th>Required</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Yes</td>
    <td>String</td>
    <td>Quantitative Objective type</td>
  </tr>
</table>

##### Return Payload

Example:

    Another type

##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>201</td>
    <td>Quantitative Objective type created</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>409</td>
    <td>Objective type already exists </td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### PATCH - Update quantitative objective type

##### Request

PATCH /api/objectiveType<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Date: Wed, 12 Jun 2019 15:04:41 GMT<br>
Connection: keep-alive<br>
Content-Length: 0

##### Query Parameters

None

##### Transfer Payload

<table>
  <tr>
    <th>Name</th>
    <th>Required</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Yes</td>
    <td>Integer</td>
    <td>ID of the objective type</td>
  </tr>
  <tr>
    <td>type</td>
    <td>Yes</td>
    <td>String</td>
    <td>New type value</td>
  </tr>
</table>

##### Return Payload

None

##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>Quantitative Objective type updated</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>409</td>
    <td>Objective type already exists</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### DELETE - Delete quantitative objective type

##### Request

DELETE /api/objectiveType?id=VALUE<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Date: Wed, 12 Jun 2019 14:27:38 GMT<br>
Connection: keep-alive

##### Query Parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Yes</td>
    <td>ID of the objective type to delete</td>
  </tr>
</table>

##### Transfer Payload

None

##### Return Payload

None

##### Return Codes

<table >
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td>Objective type deleted</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>
<br><br>

### evaluationModelRouter



#### GET - Read Evaluation Models

##### Request

GET /api/evaluationModel<br>
GET /api/evaluationModel?id=VALUE<br>
GET /api/evaluationModel?model=VALUE<br>
GET /api/evaluationModel?idCycle=VALUE<br>
Accept: application/json
<br><br>
#### Response example:

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Content-Type: application/json; charset=utf-8<br>
Content-Length: 290<br>
ETag: W/"122-Y/U7khcCOfrz9wnfD+mDZtmHxhg"<br>
Date: Wed, 12 Jun 2019 14:56:36 GMT<br>
Connection: keep-alive

Example:
   
    {
      "id": VALUE,
      "model": VALUE,
      "active": VALUE,
      "id_evaluation_cycles": VALUE,
      "createdAt": VALUE,
      "updatedAt": VALUE"
    }

##### Query Parameters


<table>
  <tr>
    <th>Parameter</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>No</td>
    <td>Filter by model id</td>
  </tr>
  <tr>
    <td>model</td>
    <td>No</td>
    <td>Filter by model name</td>
  </tr>
  <tr>
    <td>idCycle</td>
    <td>No</td>
    <td>Filter models by their evaluation cycle id</td>
  </tr>
</table>

##### Transfer Payload

None

##### Return Payload

Example:


    {
        "id": 1,
        "model": "Model",
        "active": false,
        "id_evaluation_cycles": 1,
        "createdAt": "2019-06-12T09:26:47.000Z",
        "updatedAt": "2019-06-12T09:26:47.000Z"
    },
    {
        "id": 2,
        "model": "Model2",
        "active": false,
        "id_evaluation_cycles": 2,
        "createdAt": "2019-06-12T09:27:23.000Z",
        "updatedAt": "2019-06-12T09:27:23.000Z"
    }


##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>Evaluation model found</td>
  </tr>
  <tr>
    <td>404</td>
    <td>Evaluation model not found</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### POST - Create an evaluation model

##### Request

POST /api/evaluationModel<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Content-Type: text/html; charset=utf-8<br>
Content-Length: 7<br>
ETag: W/"7-rXPLL8SBBvt3rad2CExQURRrtNo"<br>
Date: Wed, 12 Jun 2019 15:01:05 GMT<br>
Connection: keep-alive

    VALUE

##### Query Parameters

None

##### Transfer Payload

<table>
  <tr>
    <th>Name</th>
    <th>Required</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>model</td>
    <td>Yes</td>
    <td>String</td>
    <td>Name/Title of the evaluation model</td>
  </tr>
  <tr>
    <td>idCycle</td>
    <td>Yes</td>
    <td>Integer</td>
    <td>The evaluation model's evaluation cycle id</td>
  </tr>
</table>

##### Return Payload

Example:

    Model2

##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>201</td>
    <td>Evaluation model created</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>404</td>
    <td>Evaluation cycle not found</td>
  </tr>
  <tr>
    <td>409</td>
    <td>Evaluation model already exists or a model already uses that evaluation cycle</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### PATCH - Update evaluation model

##### Request

PATCH /api/evaluationModel<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Date: Wed, 12 Jun 2019 15:04:41 GMT<br>
Connection: keep-alive<br>
Content-Length: 0

##### Query Parameters

None

##### Transfer Payload

<table>
  <tr>
    <th>Name</th>
    <th>Required</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Yes</td>
    <td>Integer</td>
    <td>ID of the evaluation model</td>
  </tr>
  <tr>
    <td>model</td>
    <td>Yes</td>
    <td>String</td>
    <td>New model name</td>
  </tr>
  <tr>
    <td>idCycle</td>
    <td>No</td>
    <td>Integer</td>
    <td>New evaluation cycle's id</td>
  </tr>
</table>

##### Return Payload

None

##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>Evaluation model updated</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>409</td>
    <td>An evaluation model with this name or cycle already exists</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>


#### PATCH - Deactivate or reactivate evaluation model

##### Request

PATCH /api/evaluationModel/ID<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Content-Type: text/html; charset=utf-8
Date: Wed, 12 Jun 2019 15:04:41 GMT<br>
ETag: W/"1c-scBuYB0+8GgMshI72woI0UKxvPA"
Content-Length: 28
Connection: keep-alive<br>


##### Query Parameters

None

##### Transfer Payload

None

##### Return Payload

Evaluation model deactivated/reactivated

##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>202</td>
    <td>Evaluation model activated/deactivated</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>404</td>
    <td>Evaluation model not found</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>



#### DELETE - Delete evaluation model

##### Request

DELETE /api/evaluationModel?id=VALUE<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Date: Wed, 12 Jun 2019 14:27:38 GMT<br>
Connection: keep-alive

##### Query Parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Yes</td>
    <td>ID of the evaluation model to delete</td>
  </tr>
</table>

##### Transfer Payload

None

##### Return Payload

None

##### Return Codes

<table >
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td>Evaluation model deleted</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>
<br><br>

### competencyRouter



#### GET - Read competencies

##### Request

GET /api/competency<br>
GET /api/competency?id=VALUE<br>
GET /api/competency?competency=VALUE<br>
GET /api/competency?idAnswerType=VALUE<br>
Accept: application/json
<br><br>
#### Response example:

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Content-Type: application/json; charset=utf-8<br>
Content-Length: 56<br>
ETag: W/"38-RaTRsYsi1dKnBYL/7zUTmEDf35Q"<br>
Date: Wed, 12 Jun 2019 14:56:36 GMT<br>
Connection: keep-alive

Example:
   
    {
      "id": VALUE,
      "competency": VALUE,
      "id_answer_types": VALUE"
    }

##### Query Parameters


<table>
  <tr>
    <th>Parameter</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>No</td>
    <td>Filter by competency id</td>
  </tr>
  <tr>
    <td>competency</td>
    <td>No</td>
    <td>Filter by competency</td>
  </tr>
  <tr>
    <td>idAnswerType</td>
    <td>No</td>
    <td>Filter competencies by their answer type id</td>
  </tr>
</table>

##### Transfer Payload

None

##### Return Payload

Example:


    {
        "id": 1,
        "competency": "Competency",
        "id_answer_types": 1
    }


##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>Competency found</td>
  </tr>
  <tr>
    <td>404</td>
    <td>Competency not found</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### POST - Create a competency

##### Request

POST /api/competency<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Content-Type: text/html; charset=utf-8<br>
Content-Length: 10<br>
ETag: W/"a-BeWbsO02CsXPzIXNuKMYTgRCdD8"<br>
Date: Wed, 12 Jun 2019 15:01:05 GMT<br>
Connection: keep-alive

    VALUE

##### Query Parameters

None

##### Transfer Payload

<table>
  <tr>
    <th>Name</th>
    <th>Required</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>competency</td>
    <td>Yes</td>
    <td>String</td>
    <td>The competency to create</td>
  </tr>
  <tr>
    <td>idAnswerType</td>
    <td>Yes</td>
    <td>Integer</td>
    <td>The competency's answer type's id</td>
  </tr>
</table>

##### Return Payload

Example:

    Competency

##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>201</td>
    <td>Competency created</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>404</td>
    <td>Answer type not found</td>
  </tr>
  <tr>
    <td>409</td>
    <td>Competency already exists</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### PATCH - Update competency

##### Request

PATCH /api/competency<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Date: Wed, 12 Jun 2019 15:04:41 GMT<br>
Connection: keep-alive<br>
Content-Length: 0

##### Query Parameters

None

##### Transfer Payload

<table>
  <tr>
    <th>Name</th>
    <th>Required</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Yes</td>
    <td>Integer</td>
    <td>ID of the competency</td>
  </tr>
  <tr>
    <td>competency</td>
    <td>Yes</td>
    <td>String</td>
    <td>New competency</td>
  </tr>
  <tr>
    <td>idAnswerType</td>
    <td>No</td>
    <td>Integer</td>
    <td>New answer type's id</td>
  </tr>
</table>

##### Return Payload

None

##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>Competency updated</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>409</td>
    <td>Competency already exists</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### DELETE - Delete competency

##### Request

DELETE /api/competency?id=VALUE<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Date: Wed, 12 Jun 2019 14:27:38 GMT<br>
Connection: keep-alive

##### Query Parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Yes</td>
    <td>ID of the competency to delete</td>
  </tr>
</table>

##### Transfer Payload

None

##### Return Payload

None

##### Return Codes

<table >
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td>Competency deleted</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>
<br><br>

### quantitativeObjectiveRouter



#### GET - Read quantitative objectives

##### Request

GET /api/objective<br>
GET /api/objective?id=VALUE<br>
GET /api/objective?competency=VALUE<br>
GET /api/objective?idAnswerType=VALUE<br>
Accept: application/json
<br><br>
#### Response example:

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Content-Type: application/json; charset=utf-8<br>
Content-Length: 90<br>
ETag: W/"5a-mgMFchKLG/HKl9FIfQWrSNvwT+4"<br>
Date: Wed, 12 Jun 2019 14:56:36 GMT<br>
Connection: keep-alive

Example:
   
    {
      "id": VALUE,
      "objective": VALUE,
      "id_answer_types": VALUE",
      "id_quantitative_objective_types": VALUE
    }

##### Query Parameters


<table>
  <tr>
    <th>Parameter</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>No</td>
    <td>Filter by objective id</td>
  </tr>
  <tr>
    <td>objective</td>
    <td>No</td>
    <td>Filter by objective</td>
  </tr>
  <tr>
    <td>idAnswerType</td>
    <td>No</td>
    <td>Filter objectives by their answer type id</td>
  </tr>
  <tr>
    <td>idObjectiveType</td>
    <td>No</td>
    <td>Filter objectives by their objective type id</td>
  </tr>
</table>

##### Transfer Payload

None

##### Return Payload

Example:


    {
        "id": 1,
        "objective": "Objective",
        "id_answer_types": 1,
        "id_quantitative_objective_types": 1
    }


##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>Objective found</td>
  </tr>
  <tr>
    <td>404</td>
    <td>Objective not found</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### POST - Create a quantitative objective

##### Request

POST /api/objective<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Content-Type: text/html; charset=utf-8<br>
Content-Length: 10<br>
ETag: W/"a-ziEB1T55JXna04yTjE8MvFhHNuw"<br>
Date: Wed, 12 Jun 2019 15:01:05 GMT<br>
Connection: keep-alive

    VALUE

##### Query Parameters

None

##### Transfer Payload

<table>
  <tr>
    <th>Name</th>
    <th>Required</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>objective</td>
    <td>Yes</td>
    <td>String</td>
    <td>The objective to create</td>
  </tr>
  <tr>
    <td>idAnswerType</td>
    <td>Yes</td>
    <td>Integer</td>
    <td>The objective's answer type's id</td>
  </tr>
  <tr>
    <td>idObjectiveType</td>
    <td>Yes</td>
    <td>Integer</td>
    <td>The objective's objective type</td>
  </tr>
</table>

##### Return Payload

Example:

    Objective

##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>201</td>
    <td>Objective created</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>404</td>
    <td>Answer type or objective type not found</td>
  </tr>
  <tr>
    <td>409</td>
    <td>Competency already exists</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### PATCH - Update quantitative objective

##### Request

PATCH /api/objective<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Date: Wed, 12 Jun 2019 15:04:41 GMT<br>
Connection: keep-alive<br>
Content-Length: 0

##### Query Parameters

None

##### Transfer Payload

<table>
  <tr>
    <th>Name</th>
    <th>Required</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Yes</td>
    <td>Integer</td>
    <td>ID of the objective</td>
  </tr>
  <tr>
    <td>objective</td>
    <td>Yes</td>
    <td>String</td>
    <td>New objective</td>
  </tr>
  <tr>
    <td>idAnswerType</td>
    <td>No</td>
    <td>Integer</td>
    <td>New answer type's id</td>
  </tr>
  <tr>
    <td>idObjectiveType</td>
    <td>No</td>
    <td>Integer</td>
    <td>New objective type's id</td>
  </tr>
</table>

##### Return Payload

None

##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>Quantitative objective updated</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>404</td>
    <td>Invalid answer type <b>and</b> objective type</td>
  </tr>
  <tr>
    <td>409</td>
    <td>Objective already exists</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### DELETE - Delete quantitative objective

##### Request

DELETE /api/objective?id=VALUE<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Date: Wed, 12 Jun 2019 14:27:38 GMT<br>
Connection: keep-alive

##### Query Parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Yes</td>
    <td>ID of the objective to delete</td>
  </tr>
</table>

##### Transfer Payload

None

##### Return Payload

None

##### Return Codes

<table >
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td>Objective deleted</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>
<br><br>

### evaluationRouter



#### GET - Read evaluations

##### Request

GET /api/evaluation<br>
GET /api/evaluation?id=VALUE<br>
GET /api/evaluation?idWorker=VALUE<br>
GET /api/evaluation?idEvaluationModel=VALUE<br>
Accept: application/json
<br><br>
#### Response example:

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Content-Type: application/json; charset=utf-8<br>
Content-Length: 90<br>
ETag: W/"5a-mgMFchKLG/HKl9FIfQWrSNvwT+4"<br>
Date: Wed, 12 Jun 2019 14:56:36 GMT<br>
Connection: keep-alive

Example:
   
    {
        "id": VALUE,
        "id_worker": VALUE,
        "json": VALUE,
        "id_evaluation_models": VALUE,
        "createdAt": VALUE,
        "updatedAt": VALUE"
    }

##### Query Parameters


<table>
  <tr>
    <th>Parameter</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>No</td>
    <td>Filter by evaluation id</td>
  </tr>
  <tr>
    <td>idWorker</td>
    <td>No</td>
    <td>Filter by the id of the evaluated worker</td>
  </tr>
  <tr>
    <td>idEvaluationModel</td>
    <td>No</td>
    <td>Filter evaluations by their model's id</td>
  </tr>
</table>

##### Transfer Payload

None

##### Return Payload

Example:


    {
        "id": 1,
        "id_worker": 1,
        "json": "json_code",
        "id_evaluation_models": 1,
        "createdAt": "2019-06-12T15:45:03.000Z",
        "updatedAt": "2019-06-12T15:45:03.000Z"
    }


##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>Evaluation found</td>
  </tr>
  <tr>
    <td>404</td>
    <td>Evaluation not found</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### POST - Create an evaluation

##### Request

POST /api/evaluation<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Content-Length: 0<br>
Date: Wed, 12 Jun 2019 15:01:05 GMT<br>
Connection: keep-alive

##### Query Parameters

None

##### Transfer Payload

<table>
  <tr>
    <th>Name</th>
    <th>Required</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>idWorker</td>
    <td>Yes</td>
    <td>Integer</td>
    <td>The evaluated worker's id</td>
  </tr>
  <tr>
    <td>idEvaluationModel</td>
    <td>Yes</td>
    <td>Integer</td>
    <td>The id of the evaluation model used</td>
  </tr>
  <tr>
    <td>json</td>
    <td>Yes</td>
    <td>Text</td>
    <td>The evaluation file converted to JSON</td>
  </tr>
</table>

##### Return Payload

None

##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>201</td>
    <td>Evaluation created</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>404</td>
    <td>Evaluation model not found</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### PATCH - Update evaluation

##### Request

PATCH /api/evaluation<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Date: Wed, 12 Jun 2019 15:04:41 GMT<br>
Connection: keep-alive<br>
Content-Length: 0

##### Query Parameters

None

##### Transfer Payload

<table>
  <tr>
    <th>Name</th>
    <th>Required</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Yes</td>
    <td>Integer</td>
    <td>ID of the evaluation</td>
  </tr>
  <tr>
    <td>idWorker</td>
    <td>Yes</td>
    <td>Integer</td>
    <td>Worker's id</td>
  </tr>
  <tr>
    <td>idEvaluationModel</td>
    <td>Yes</td>
    <td>Integer</td>
    <td>Evaluation model's id</td>
  </tr>
  <tr>
    <td>json</td>
    <td>Yes</td>
    <td>Text</td>
    <td>Updated evaluation converted to JSON</td>
  </tr>
</table>

##### Return Payload

None

##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>Evaluation updated</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### DELETE - Delete quantitative objective

##### Request

DELETE /api/evaluation?id=VALUE<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Date: Wed, 12 Jun 2019 14:27:38 GMT<br>
Connection: keep-alive

##### Query Parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Yes</td>
    <td>ID of the evaluation to delete</td>
  </tr>
</table>

##### Transfer Payload

None

##### Return Payload

None

##### Return Codes

<table >
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td>Evaluation deleted</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>
<br><br>

### evalModelCompetencyRouter



#### GET - Read relations between models and competencies

##### Request

GET /api/evalModelCompetency<br>
GET /api/evalModelCompetency?idModel=VALUE<br>
GET /api/evalModelCompetency?idCompetency=VALUE<br>
Accept: application/json
<br><br>
#### Response example:

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Content-Type: application/json; charset=utf-8<br>
Content-Length: 48<br>
ETag: W/"30-+Wx4Qyv25cFb4v/Pg0ADT+BCtDo"<br>
Date: Wed, 12 Jun 2019 14:56:36 GMT<br>
Connection: keep-alive

Example:
   
    {
        "id_evaluation_models": VALUE,
        "id_competencies": VALUE
    }

##### Query Parameters


<table>
  <tr>
    <th>Parameter</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>idModel</td>
    <td>No</td>
    <td>Filter by the id of the evaluation model</td>
  </tr>
  <tr>
    <td>idCompetency</td>
    <td>No</td>
    <td>Filter by the id of the competency</td>
  </tr>
</table>

##### Transfer Payload

None

##### Return Payload

Example:


    {
        "id_evaluation_models": 1,
        "id_competencies": 1
    }


##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>Relation found</td>
  </tr>
  <tr>
    <td>404</td>
    <td>Relation not found</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### POST - Create a relation between a model and a competency


##### Request
POST /api/evalModelCompetency<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Content-Length: 0<br>
Date: Wed, 12 Jun 2019 15:01:05 GMT<br>
Connection: keep-alive

##### Query Parameters

None

##### Transfer Payload

<table>
  <tr>
    <th>Name</th>
    <th>Required</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>idModel</td>
    <td>Yes</td>
    <td>Integer</td>
    <td>The evaluation model's id</td>
  </tr>
  <tr>
    <td>idCompetency</td>
    <td>Yes</td>
    <td>Integer</td>
    <td>The competency's id</td>
  </tr>
</table>

##### Return Payload

None

##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>201</td>
    <td>Relation created</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>409</td>
    <td>Relation already exists</td>
  </tr>
  <tr>
    <td>404</td>
    <td>Evaluation model or competency not found</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>
<br><br>

### PATCH IS *NOT* USED.

<br><br>

#### DELETE - Delete relation

##### Request

DELETE /api/evalModelCompetency?idModel=VALUE&idCompetency=VALUE<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Date: Wed, 12 Jun 2019 14:27:38 GMT<br>
Connection: keep-alive

##### Query Parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>idModel</td>
    <td>Yes</td>
    <td>ID of the evaluation model</td>
  </tr>
  <tr>
    <td>idCompetency</td>
    <td>Yes</td>
    <td>ID of the competency</td>
  </tr>
</table>

##### Transfer Payload

None

##### Return Payload

None

##### Return Codes

<table >
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td>Relation deleted</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>
<br><br>

### evalModelQuantObjectiveRouter



#### GET - Read relations between models and quantitative objectives

##### Request

GET /api/evalModelQuantObjective<br>
GET /api/evalModelQuantObjective?idModel=VALUE<br>
GET /api/evalModelQuantObjective?idObjective=VALUE<br>
Accept: application/json
<br><br>
#### Response example:

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Content-Type: application/json; charset=utf-8<br>
Content-Length: 48<br>
ETag: W/"30-+Wx4Qyv25cFb4v/Pg0ADT+BCtDo"<br>
Date: Wed, 12 Jun 2019 14:56:36 GMT<br>
Connection: keep-alive

Example:
   
    {
        "id_evaluation_models": VALUE,
        "id_quantitative_objectives": VALUE
    }

##### Query Parameters


<table>
  <tr>
    <th>Parameter</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>idModel</td>
    <td>No</td>
    <td>Filter by the id of the evaluation model</td>
  </tr>
  <tr>
    <td>idObjective</td>
    <td>No</td>
    <td>Filter by the id of the objective</td>
  </tr>
</table>

##### Transfer Payload

None

##### Return Payload

Example:


    {
        "id_evaluation_models": 1,
        "id_quantitative_objectives": 1
    }


##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>Relation found</td>
  </tr>
  <tr>
    <td>404</td>
    <td>Relation not found</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>

#### POST - Create a relation between a model and a quantitative objective


##### Request
POST /api/evalModelQuantObjective<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Content-Length: 0<br>
Date: Wed, 12 Jun 2019 15:01:05 GMT<br>
Connection: keep-alive

##### Query Parameters

None

##### Transfer Payload

<table>
  <tr>
    <th>Name</th>
    <th>Required</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>idModel</td>
    <td>Yes</td>
    <td>Integer</td>
    <td>The evaluation model's id</td>
  </tr>
  <tr>
    <td>idCompetency</td>
    <td>Yes</td>
    <td>Integer</td>
    <td>The competency's id</td>
  </tr>
</table>

##### Return Payload

None

##### Return Codes

<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>201</td>
    <td>Relation created</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>409</td>
    <td>Relation already exists</td>
  </tr>
  <tr>
    <td>404</td>
    <td>Evaluation model or quantitative objective not found</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>
<br><br>

### PATCH IS *NOT* USED.

<br><br>

#### DELETE - Delete relation

##### Request

DELETE /api/evalModelQuantObjective?idModel=VALUE&idObjective=VALUE<br>
Accept: application/json<br>

X-Powered-By: Express<br>
Access-Control-Allow-Origin: *<br>
Date: Wed, 12 Jun 2019 14:27:38 GMT<br>
Connection: keep-alive

##### Query Parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>idModel</td>
    <td>Yes</td>
    <td>ID of the evaluation model</td>
  </tr>
  <tr>
    <td>idObjective</td>
    <td>Yes</td>
    <td>ID of the quantitative objective</td>
  </tr>
</table>

##### Transfer Payload

None

##### Return Payload

None

##### Return Codes

<table >
  <tr>
    <th>Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td>Relation deleted</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Required data field not sent</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Internal Server Error - There was an unexpected error at some point during the processing of the request.</td>
  </tr>
</table>