### USER_TB
id | name | email | password | salt
---|---|---|---|---|

##### PK Constraint
id

##### FK Constaint
None

### POST_TB
| id | author | title | contents | createdAt | updatedAt |
---|---|---|---|---|---|

##### PK Constraint
id

##### FK Constaint
author : USER_TB의 id

### LIKE_TB 
| id | post_id | user_id |
---|---|---|

##### PK Constraint
id

##### FK Constaint
post_id : POST_TB의 id
user_id : USER_TB의 id