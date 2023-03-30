
| Method | Description | Route | Access |
| ------ | ----------- | ----- | ------ |
| POST | Authenticate a new artist into the system | /artist/signup | 🌐 Public |
| POST | Signs the artist in | /artist/signin | 🌐 Public |
| GET | Signs the artist out | /artist/ | 🌐 Public |
| GET | Gets the Artist that's currently signed in | /artist/me | 🔒 Private |
| GET | Get All artist | /artists/ | 🔒 Private |
| GET | Get All artist's albums | /artists/albums/:id | 🌐 Public |
| POST | Create a new Artist | /artists/ | 🔒 Private |
| PUT | Edit a specific Artist | /artists/:id | 🔒 Private |
| DELETE | Delete a specific Artist | /artists/:id | 🔒 Private |

# Artist API

## Create a New Artist
- Route: /artist/signup
- HTTP Method: POST
- Access: 🌐 Public
- Description: 📝 Authenticate a new artist into the system

## Sign In Artist
- Route: /artist/signin
- HTTP Method: POST
- Access: 🌐 Public
- Description: 🚪 Signs the artist in

## Sign Out Artist
- Route: /artist/
- HTTP Method: GET
- Access: 🌐 Public
- Description: 🔑 Signs the artist out

## Get Current Artist
- Route: /artist/me
- HTTP Method: GET
- Access: 🔒 Private
- Description: 🔍 Gets the Artist that's currently signed in

## Get All Artist's Albums
- Route: /artists/albums/:id
- HTTP Method: GET
- Access: 🌐 Public
- Description: 📖 Get all artist's albums

## Edit a Specific Artist
- Route: /artists/:id
- HTTP Method: PUT
- Access: 🔒 Private
- Description: 🖋️ Edit a specific artist

### Delete a Specific Album

* Route: `/albums/:id`
* HTTP Method: `DELETE`
* Access: 🔒 Private
* Description: 🗑️ Delete a specific album