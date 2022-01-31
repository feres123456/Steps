const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const List = require("./Schema");
const Employees = require("./SchemaEmployees");
const Authors = require("./SchemaAuthors");
const Typebooks = require("./SchemaTypebooks");
const Userdb = require("./SchemaUsers");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");

// add array
verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    res.status(400).send("access rejected ...");
  }
  try {
    jwt.verify(token, privatekey);
    next();
  } catch (e) {
    res.status(400).send(e);
  }
};

// app config
const app = express();
const port = 9000;
app.use("/uploads", express.static("./uploads"));
const connection_url =
  "mongodb+srv://admin:feres123@cluster0.wezd8.mongodb.net/userlogin?retryWrites=true&w=majority";

// middlwares
app.use(express.json());
app.use(cors());

// DB config
mongoose.connect(connection_url);
console.log("Welcome to MongoDB");

// API Endpoints

app.post("/test", (req, res) => {
  const dbcard = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  List.create(dbcard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("sucess");
    }
  });
});

app.get("/listusers", (req, res) => {
  Userdb.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/registre", (req, res) => {
  return new Promise((resolve, reject) => {
    Userdb.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        res.send("this acc already exist");
      } else {
        bcrypt.hash(req.body.password, 10).then((hashedPassword) => {
          const dbcard = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            admin: "false",
            employees: "false",
          };
          Userdb.create(dbcard, (err, data) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).json({ auth: true });
            }
          });
        });
      }
    });
  });
});

var privatekey = " azerazerazreazerazerazerazerazerazerazer";
app.post("/login", (req, res) => {
  return new Promise((resolve, reject) => {
    Userdb.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password).then((valid) => {
          if (valid) {
            let token = jwt.sign(
              { id: user.id, username: user.name },
              privatekey,
              {
                expiresIn: "1h",
              }
            );
            // sucess
            res.status(200).json({
              auth: "true",
              token: token,
              user: user._id,
              admin: user.admin,
            });
          } else {
            // pass incorect
            res
              .status(200)
              .json({ auth: "false", message: "Password Incorect" });
          }
        });
      } else {
        // acc dont exist
        res
          .status(200)
          .json({ auth: false, message: "this account does not exist " });
      }
    });
  });
});

// MULTER FOR IMAGE
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
});
// -------------------------------- Books CRUD --------------------------------------------------
// ADD BOOKS
app.post("/addbooks", upload.single("avatar"), function (req, res) {
  const file = req.file;
  console.log(file.originalname);
  const dbcard = {
    booksname: req.body.booksname,
    bookspdf: req.file.path,
    authorsname: req.body.authorsname,
    bookstype: req.body.bookstype,
  };
  List.create(dbcard, (err, data) => {
    if (err) {
      res.status(500).json((message = "Error"));
    } else {
      res.status(200).json((message = "Added"));
    }
  });
});

// DELETE Books
app.delete("/deletebooks/:id", (req, res) => {
  const id = req.params.id;
  List.findByIdAndRemove(id).exec();
  res.json((message = "Deleted"));
});

// Get Books
app.get("/getbooks", (req, res) => {
  List.find((err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// UPDATE Books
app.put("/updatebooks", upload.single("avatar"), (req, res) => {
  const id = req.body.id;
  const file = req.file;
  console.log(id, file);
  const booksname = req.body.booksname;
  const bookspdf = req.file.path;
  const authorsname = req.body.authorsname;
  const bookstype = req.body.bookstype;

  List.findById(id, (err, update) => {
    if (err) {
      res.json((message = "error"));
    } else {
      update.booksname = booksname;
      update.bookspdf = bookspdf;
      update.authorsname = authorsname;
      update.bookstype = bookstype;

      update.save();
      res.json((message = "updated"));
    }
  });
});
// ------------------- End Crud Books ----------------------------------------------------------------------

//  ---------------------------------ADD AUTHORS--------------------------
app.post("/addauthors", function (req, res) {
  const dbcard = {
    name: req.body.name,
  };
  Authors.create(dbcard, (erra, data) => {
    if (erra) {
      res.status(500).json((message = "error"));
    } else {
      res.status(200).json((message = "Authors Added... ! "));
    }
  });
});
// GET AUTHORS
app.get("/getauthors", (req, res) => {
  Authors.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// UPDATE AUTHORS
app.put("/updateauthors", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;

  Authors.findById(id, (err, update) => {
    if (err) {
      res.json((message = "error"));
    } else {
      update.name = name;
      update.save();
      res.json((message = "updated"));
    }
  });
});
// DELETE AUTHORS
app.delete("/deleteauth/:id", (req, res) => {
  const id = req.params.id;
  Authors.findByIdAndRemove(id).exec();
  res.json((message = "Deleted"));
});

// GET
app.get("/getall", (req, res) => {
  List.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// ----------------------------------------------------------- BOOKS TYPES ------------------------------------------------------
// ADD TYPE OF BOOKS
app.post("/addtypebooks", function (req, res) {
  const dbcard = {
    name: req.body.name,
  };
  Typebooks.create(dbcard, (erra, data) => {
    if (erra) {
      res.status(500).json((message = "error"));
    } else {
      res.status(200).json((message = "Authors Added... ! "));
    }
  });
});

// GET TYPE BOOK
app.get("/gettypebooks", (req, res) => {
  Typebooks.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// UPDATE TYPE BOOK
app.put("/updatetypebooks", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;

  Typebooks.findById(id, (err, update) => {
    if (err) {
      res.json((message = "error"));
    } else {
      update.name = name;
      update.save();
      res.json((message = "updated"));
    }
  });
});
// DELETE TYPE BOOK
app.delete("/deletetypebooks/:id", (req, res) => {
  const id = req.params.id;
  Typebooks.findByIdAndRemove(id).exec();
  res.json((message = "Deleted"));
});
// --------------------------- End CRUD TYPE BOOKS ---------------
// ------------------------- ADD EMPLOYEES STAT---------------
app.put("/empstat", (req, res) => {
  const id = req.body.id;
  const employees = req.body.employees;

  Userdb.findById(id, (err, update) => {
    if (err) {
      res.json((message = "error"));
    } else {
      update.employees = employees;
      update.save();
      res.json((message = "updated"));
    }
  });
});

//------------------------------------------------- ADD ADMIN STAT
app.put("/adminstat", (req, res) => {
  const id = req.body.id;
  const admin = req.body.admin;

  Userdb.findById(id, (err, update) => {
    if (err) {
      res.json((message = "error"));
    } else {
      update.admin = admin;
      update.save();
      res.json((message = "updated"));
    }
  });
});

// Listenner
app.listen(port, () => console.log(`Listenning on localhost : ${port}`));
