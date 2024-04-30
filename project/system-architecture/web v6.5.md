##### Interface 18	web::Registration ==> database::Registration (Register)

~~~json
{
   "UserName": {
        "type": "string",
    	"minLength": 1
    },
    "UserPassword": {
        "type": "string",
    	"minLength": 1,
        "maxLength": 6
    }
}

return with

{
    "MatchToken": {"type": "boolean"}
}
~~~

* Description of the interface: This occurs when a new store owner attempts to register its account, which returns an indicator asserting whether the registration is successful.
* Tip1: At the database end, if an existing store owner account holds the same username, the registration should be considered unsuccessful.

##### Interface 19	web::Login ==> database::Login (Login)

~~~json
{
    "UserName": {
        "type": "string",
    	"minLength": 1
    },
    "UserPassword": {
        "type": "string",
    	"minLength": 1,
        "maxLength": 6
    }
}

return with

{
    "MatchToken": {"type": "boolean"}
}
~~~

* Description of the interface: This takes place when a store owner or the administrator attempts to login to their accounts, which returns an indicator asserting whether the login process is successful.
* Tip1: At the database end, if the username and the password match a registered account, the login should be considered successful.
* Tip2: Currently the username of the administrator account is "admin", so the role of the user logged-in can be determined by the username.

##### Interface 20	web::Management ==> database::Administrator (Check userData)

~~~json
{
    [empty]
}

return with

{
	"UserData" : {
    	"type": "array",
        "items": {
            "UserId":{
                "type":"integer",
                "minimum": 0,
            },
            "UserName": {
                "type": "string",
                "minLength": 1
            },
            "UserPassword": {
                "type": "string",
                "minLength": 1
            },
            "Birthday": {
                "type": "date"("string")
            },
            "Interests": {
                "items": "string",
                "minimumlength": 1
            },
            "Email": {
                "type": "string"
            },
        },
        "minItems": 0
    }
}
~~~

* Description of the interface: This procedure describes when the administrator check the user data. When returning password, database just need to return a random string.

##### Interface 21	web::Management ==> database::Administrator (Update userData)

~~~json
{
    "UserId":{
        "type":"integer",
        "minimum": 0,
    },
    "UserName": {
        "type": "string",
        "minLength": 1
    },
    "UserPassword": {
        "type": "string",
        "minLength": 1
    },
    "Birthday": {
        "type": "date"("string")
    },
    "Interests": {
       	"items": "string",
        "minimumlength": 1
    },
    "Email": {
        "type": "string"
    }
}

return with

{
    [empty]
}
~~~

* Description of the interface: This procedure describes when the administrator update the user data. Since UserId is the primary key of the UserData, **if database receive a request with existed UserId, that means an update to this user; if database receive a new UserId, that means adding a new user.**

##### Interface 22	web::Management ==> database::Administrator (Delete userData)

~~~json
{
    "UserId":{
        "type":"integer",
        "minimum": 0,
    }
}

return with

{
    [empty]
}
~~~

* Description of the interface: This procedure describes when the administrator delete a user's data. Given the database an UserId to decide which user to delete.

##### Interface 23	web::Management ==> database::Administrator (Check storeData)

~~~json
{
    [empty]
}

return with

{
	"StoreData" : {
    	"type": "array",
        "items": {
            "UserId":{
                "type":"integer",
                "minimum": 0,
            },
            "UserName": {
                "type": "string",
                "minLength": 1
            },
            "UserPassword": {
                "type": "string",
                "minLength": 1
            },
            "StoreName": {
                "type": "string",
                "minLength": 1
            },
            "StoreLocation": {
                "type": "string"
            },
            "AvgRate": {
                "type": "float"
            }
        },
        "minItems": 0
    }
}
~~~

* Description of the interface: This procedure describes when the administrator check the store owner data. When returning password, database just need to return a random string.

##### Interface 24	web::Management ==> database::Administrator (Update storeData)

~~~json
{
	"UserId":{
        "type":"integer",
        "minimum": 0,
    },
    "UserName": {
        "type": "string",
        "minLength": 1
    },
    "UserPassword": {
        "type": "string",
        "minLength": 1
    },
    "StoreName": {
        "type": "string",
        "minLength": 1
    },
    "StoreLocation": {
        "type": "string"
    }
}

return with

{
    [empty]
}
~~~

* Description of the interface: This procedure describes when the administrator update the store owner data. Since UserId is the primary key of the StoreData (**NOTE: STORE OWNER ALSO OWNS ITS USERNAE AND PASSWORD SINCE IT NEED TO LOG IN THE SYSTEM**), **if database receive a request with existed UserId, that means an update to this store owner; if database receive a new UserId, that means adding a new store owner.**

##### Interface 25	web::Management ==> database::Administrator (Delete storeData)

~~~json
{
    "UserId":{
        "type":"integer",
        "minimum": 0,
    }
}

return with

{
    [empty]
}
~~~

* Description of the interface: This procedure describes when the administrator delete a user's data. Given the database an UserId to decide which store owner to delete.

##### Interface 26	web::Analytics ==> database::Analytics (Check Analysis)

~~~json
{
    [empty]
}

return with

{
    "SelectedComments":{
        "type": "array",
    	"items": {
            "Comments":{
                "type":"string",
            },
            "Rating": {
                "type": "integer",
                "minimum": 1,
                "maximum": 10
            }
        },
        "minItems": 1
	},
    "OverallAdvices": {
    	"type": "array",
    	"items": {
            "type": "string"
        },
        "minItems": 1
	}
}
~~~

* Description of the interface: This describes the analytical data that is obtained by the administrator:  "SelectedComments" is a list consists of all the comment that have a lower rating of 3, containing its comments and ratings; "OverallAdvices"  refers to a string that generated by algorithms, to be specific, the advice or advices provided by AI for systematic refinement.

##### Interface 27	web::StoreOwner ==> database::Store (Check Store Info)

~~~json
{
 	"UserName": {
        "type": "string",
        "minLength": 1
	}
}

return with

{
    "StoreName": {
        "type": "string",
        "minLength": 1
	},
    "StoreLocation": {
    	"type": "string",
        "minLength": 1
	},
    "AvgRate": {
        "type": "float",
        "minimum": 0,
        "maximum": 10
    },
    "Feedback": {
    	"type": "array",
        "items": {
            "Comments":{
                "type":"string",
            },
            "Rating": {
                "type": "integer",
                "minimum": 1,
                "maximum": 10
            }
        },
    }
}
~~~

Description of the interface: This occurs when a store owner attempts to checking the statistics of the store. Giving the database the **"UserName"** of a store owner, it need to return us with the information o its store (1 store owner owns 1 store). "StoreName" refers to the name of the store, "StoreLocation" is a string consists of a pair o integer separated by comma (For example "100,50"). "AvgRate" refers to the average rating of all feedbacks happening in a specific store. "Feedback" refers to the feedbacks happening after each single purchase.

##### Interface 28	web::StoreInfo ==> database::Store (Update Store Info)

~~~json
{
    "UserName": {
        "type": "string",
        "minLength": 1
	},
    "StoreName": {
        "type": "string",
        "minLength": 1
	},
    "StoreLocation": {
    	"type": "string",
        "minLength": 1
	}
}

return with

{
    [empty]
}
~~~

* Description of the interface: This procedure occurs when a store owner wants to update its store info, specifically, name and location of the store. **Given the UserName of the store owner, the database should update the StoreName and StoreLocation of this store owner's store.**

##### Interface 29	web::Item ==> database::Item (Check ItemData)

~~~json
{
    "UserName": {
        "type": "string",
        "minLength": 1
    }
}

return with

{
    "ItemData" : {
    	"type": "array",
        "items": {
            "ItemId":{
                "type":"integer",
                "minimum": 0,
            },
            "ItemName": {
                "type": "string",
                "minLength": 1
            },
            "ItemPrice": {
                "type": "integer",
                "minimum": 1
            },
            "ItemDescription": {
                "type": "string",
            },
            "ItemImage": {
                "type": "base64"("string")
        },
        "minItems": 0
    }
}
~~~

* Description of the interface: This procedure occurs when a store owner wants to access his items' information. Given the "UserName" of the store owner, the database should return all the item that belongs to this store owner.

##### Interface 30	web::Item ==> database::Item (Update ItemData)

~~~json
{
    "UserName": {
        "type": "string",
        "minLength": 1
    },
	"ItemId":{
        "type":"integer",
        "minimum": 0,
    },
    "ItemName": {
        "type": "string",
        "minLength": 1
    },
    "ItemPrice": {
        "type": "integer",
        "minimum": 1
    },
    "ItemDescription": {
        "type": "string",
    },
    "ItemImage": {
        "type": "base64"("string")
    }
}

return with

{
    [empty]
}
~~~

* Description of the interface: This procedure describes when the administrator or store owner update the item data. Since ItemId is the primary key of the ItemData, **if database receive a request with existed ItemId, that means an update to this item; if database receive a new ItemId, that means adding a new item.** Also provide the UserName, so if it is a add operation, database will know who owns this ietm.

##### Interface 31	web::Item ==> database::Item (Delete ItemData)

~~~json
{
	"ItemId":{
        "type":"integer",
        "minimum": 0,
    }
}

return with

{
    [empty]
}
~~~

* Description of the interface: This procedure describes when the administrator or store owner delete a item's data. Given the database an ItemId to decide which item to delete.