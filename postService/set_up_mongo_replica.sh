# docker-compose up -d
docker exec -it post_localmongo2 mongo

rs.initiate(
  {
    _id : 'rs0',
    members: [
      { _id : 0, host : "post_mongo_1:27017" },
      { _id : 1, host : "post_mongo_2:27017" },
      { _id : 1, host : "post_mongo_3:27017" },
    ]
  }
)

exit

