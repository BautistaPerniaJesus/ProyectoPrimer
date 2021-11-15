

/* Premios */

/*Defensor y atacante*/
/*Defensor: debe tener mas de siete robos y tres o mas rebotes defensivos*/
db.club.find({
    $nor: [
        {"estadisticas.robos2021": {$lte: 7}}, 
        {"estadisticas.rebotes.defensivos": {$in: [0, 1, 2]}}
    ]
})
/*Atacante: Debe mas de 10 puntos y tres o mas rebotes ofensibos*/
db.club.find({
    $and: [
        {"estadisticas.puntos2021": {$not: {$lte: 10}}},
        {"estadisticas.rebotes.ofensivos": {$not: {$in: [0, 1, 2]}}}
    ]
})

/*Eleccion para el juego de las estrellas: un base/escolta y un alapivot/pivot que tenga un buen comentario, y por supuesto no puede estar lesionado */
db.club.find({
    $and: [
     {comentario: {$exists: true, $regex: /estrella/i}},
     {posicion:{$elemMatch: {$eq:"base", $eq:"pivot"}}},
     {tienelesion: false}
    ]
})

/*Club*/

/*Capitan: Para ser al capitan del año siguiente debe tener como minimo cinco temporadas en el club*/
db.club.find({
    $and: [
    {temporadas: {$size: 5 }},
    {"fechas.fechainicio": {$lt: new Date("2019-01-01") }}
    ]
})

/*Para que juegue con la seleccion, tiene que tener la nacionalidad española, ser de la categoria junior es decir del 2003 o del 204 
o ser bastante alto, y, tener 18 juegos o mas de 20 puntos*/
db.club.find({
    $and: [
        {nacionalidad: "española"},
        {$or: [
            {"fechas.fechanacimiento": { $gte: new Date("2003-01-01"), $lte: new Date("2004-12-31")}}, 
            {altura: {$gte: 1.79}}
        ]},
        {$or: [
            {"estadisticas.juegos": {$eq: 18}},
            {"estadisticas.puntos2021": {$gt: 20}}
        ]}
    ]
})

/*Compañerismo, el jugador que quede elegido como mejor compañero tendra opcion a beca del 50% de la temporada siguiente
Se tendra en cuenta si el jugador, tiene una asistencia total, tiene el voto del equipo y si solo ha jugado en cocodrilos*/
db.club.find({
    $and: [
        {clubes: {$all: ["Cocodrilos"]}},
        {asistencia: {$eq: "total"}}
    ]
})
