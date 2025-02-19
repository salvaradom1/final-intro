const { PrismaClient } = require('@prisma/client')
const express = require('express')
const cors = require('cors')
const app = express()
const ruta = require("path")
const port = 3000

const prisma = new PrismaClient()

// todo lo q es css, imagenes y eso
app.use(cors())
app.use(express.json())
app.use(express.static(ruta.join(__dirname, "../../frontend")))

// pag principal
app.get('/', (req, res) => {
  res.sendFile(ruta.join(__dirname, "../../frontend/index.html"))
})

// pag juegos
app.get("/juegos.html", (req, res) => {
  res.sendFile(ruta.join(__dirname, "../../frontend/juegos.html"))
})

// pag busqueda
app.get("/busqueda.html", (req, res) => {
  const query = req.query.query || ""
  res.send(`Resultados de bÃºsqueda: ${query}`)
})

// todo lo de aca arriba es para conectar el front con el back

//busca las consolas relacionadas a juegos
app.get('/api/v1/juegos/:id/consolas', async (req, res) => {
  const juegoId = parseInt(req.params.id);

  const juego = await prisma.juego.findUnique({
    where: { id: juegoId },
    include: {
      consola: true, 
    },
  });

  if (juego === null) {
    res.sendStatus(404);
    return;
  }

  res.json(juego.consola); 
});

//busca todas las consolas
app.get('/api/v1/consolas', async (req, res) => {
  const consolas = await prisma.consola.findMany({
    include: {
      juego: true,
    }
  });
  res.json(consolas)
 });

//busco una consola por titulo
app.get('/api/v1/consolas/:nombre', async (req, res) => {
  const consola = await prisma.consola.findFirst({
    where: {
      nombre: req.params.nombre
    },
    include: {
      juego: true
    },
  });

  if (consola === null){
    res.sendStatus(404)
    return
  }

  res.json(consola)
}) 

//creo una consola
app.post('/api/v1/consolas', async (req, res) => {
  const consola = await prisma.consola.create({
    data: {
      nombre: req.body.nombre,
      fecha_lanzamiento: req.body.fecha_lanzamiento ? new Date(req.body.fecha_lanzamiento) : null, //hay q ver si hace falta esto
      desarrollador: req.body.desarrollador,
      almacenamiento: req.body.almacenamiento,
      tipo: req.body.tipo,
      juego: {
        connect: req.body.juegoIds?.map(id => ({ id }))
      },
    },
    include: {
      juego: true
    }
  });
  res.status(201).send(consola);
});

//elimino una consola
app.delete('/api/v1/consolas/:id', async (req, res) => {
  const consola = await prisma.consola.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  if (consola === null){
    res.sendStatus(404)
    return
  }

  await prisma.consola.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send(consola)
})

//actualizo una consola
app.put('/api/v1/consolas/:id', async (req, res) => {
  let consola = await prisma.consola.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  if (consola === null) {
    res.sendStatus(404)
    return
  }

  consola = await prisma.consola.update({
    where: {
      id: consola.id
    },
    data: {
      nombre: req.body.nombre,
      fecha_lanzamiento: req.body.fecha_lanzamiento ? new Date(req.body.fecha_lanzamiento) : null, //hay q ver si hace falta esto
      desarrollador: req.body.desarrollador,
      almacenamiento: req.body.almacenamiento,
      tipo: req.body.tipo,
      juego: {
        set: req.body.juegoIds?.map(id => ({ id })),
      },
    },
    include: {
      juego: true,
    }
  });

  res.send(consola)
})



//busco todos los juegos
app.get('/api/v1/juegos', async (req, res) => {
  const juegos = await prisma.juego.findMany({
    include: {
    consola: true,
    modo_de_juego: true,
    dlcs: true
    }
  })

  res.json(juegos)
 })

//busco un juego por titulo
app.get('/api/v1/juegos/:titulo', async (req, res) => {
  const juego = await prisma.juego.findFirst({
    where: {
      titulo: req.params.titulo
    },
    include: {
      consola: true,
      dlcs: true,
      modo_de_juego: true,
    },
  });

  if (juego === null){
    res.sendStatus(404)
    return
  }

  res.json(juego)
}) 

//creo un nuevo juego
app.post('/api/v1/juegos', async (req, res) => {
  const juego = await prisma.juego.create({
    data: {
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      modo_de_juego: { 
        connect: req.body.modoDeJuegoIds?.map(id => ({ id })), 
      }, 
      consola: {
        connect: req.body.consolaId.map(id => ({ id })),  
      },
      fecha_lanzamiento: req.body.fecha_lanzamiento ? new Date(req.body.fecha_lanzamiento) : null,
      peso: req.body.peso,
    },
    include: {
      consola: true,
      modo_de_juego: true,
      dlcs: true
    }
  })
  res.status(201).send(juego)
})




//elimino un juego
app.delete('/api/v1/juegos/:id', async (req, res) => {
  const juego = await prisma.juego.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
    include: {
      dlcs: true,
    }
    
  })

  if (juego === null){
    res.sendStatus(404)
    return
  }

  await prisma.dLC.deleteMany(
    {where: {
      juegoId: parseInt(req.params.id)
    }}
  )
  await prisma.juego.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send(juego)
})

//actualizo un juego
app.put('/api/v1/juegos/:id', async (req, res) => {
  let juego = await prisma.juego.findUnique({
    where: {
      id: parseInt(req.params.id)
    },
  })

  if (juego === null) {
    res.sendStatus(404)
    return
  }

  juego = await prisma.juego.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: {
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      modo_de_juego: { 
        connect: req.body.modoDeJuegoIds?.map(id => ({ id })), 
      }, 
      consola: {
        connect: req.body.consolaIds?.map(id => ({ id })),  
      },
      fecha_lanzamiento: req.body.fecha_lanzamiento ? new Date(req.body.fecha_lanzamiento) : null,
      peso: req.body.peso,
    },
    include: {
      consola: true,
      modo_de_juego: true,
      dlcs: true
    }
  });
  

  res.send(juego)
})

//busco todos los DLCs
app.get('/api/v1/dlcs', async (req, res) => {
  const dlcs = await prisma.dLC.findMany({
    include: {
      juego: true
    }
  })
  res.json(dlcs)
 })

//busco un dlc por id
app.get('/api/v1/dlcs/:id', async (req, res) => {
  const dlc = await prisma.dLC.findFirst({
    where: {
      id: req.params.id
    },
    include: {
      juego: true
    }
  });

  if (dlc === null){
    res.sendStatus(404)
    return
  }

  res.json(dlc)
}) 

//creo un nuevo dlc
app.post('/api/v1/dlcs', async (req, res) => {
  const dlc = await prisma.dLC.create({
    data: {
      juego: { 
        connect: { id: req.body.juegoId },
      }, 
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      fecha_lanzamiento: req.body.fecha_lanzamiento ? new Date(req.body.fecha_lanzamiento) : null,
      peso: req.body.peso,
    },
    include: {
      juego: true,
    }
  })
  res.status(201).send(dlc)
})




//elimino un juego
app.delete('/api/v1/dlcs/:id', async (req, res) => {
  const dlc = await prisma.dLC.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  })

  if (dlc === null){
    res.sendStatus(404)
    return
  }

  await prisma.dLC.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.send(dlc)
})

//actualizo un dlc
app.put('/api/v1/dlcs/:id', async (req, res) => {
  let dlc = await prisma.dLC.findUnique({
    where: {
      id: parseInt(req.params.id)
    },
  })

  if (dlc === null) {
    res.sendStatus(404)
    return
  }

  dlc = await prisma.dLC.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: {
      juego: { 
        connect: { id: req.body.juegoId },
      }, 
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      fecha_lanzamiento: req.body.fecha_lanzamiento ? new Date(req.body.fecha_lanzamiento) : null,
      peso: req.body.peso,
    },
    include: {
      juego: true
    }
  });
  res.send(dlc)
})

app.listen(port, () => {
  console.log(`gamefinder app listening on port ${port}`)
})