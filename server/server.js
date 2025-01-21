const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Port untuk backend
const port = 5000;

// Koneksi database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "trax"
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Endpoint untuk menambahkan task
app.post('/add_task', (req, res) => {
    const sql = "INSERT INTO todo (`TaskName`, `Due`, `Category`, `Urgency`, `Status`) VALUES (?, ?, ?, ?, ?)";
    const values = [
        req.body.TaskName,
        req.body.Due,
        req.body.Category,
        req.body.Urgency,
        req.body.Status,
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Query Error:', err);
            return res.status(500).json({ message: 'An error occurred', error: err });
        }
        return res.status(200).json({ success: 'Task added successfully', result });
    });
});

app.get("/todo", (req, res) => {
    const sql = "SELECT * FROM todo";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Query Error:", err);
            return res.status(500).json({ message: "Server error", error: err });
        }
        return res.status(200).json(result); // Kirim data hasil query ke frontend
    });
});

app.get("/get_todo/:ID", (req, res) => {
    const ID = req.params.ID;
    const sql = "SELECT * FROM todo WHERE `ID` = ?";
    db.query(sql, [ID], (err, result) => {
        if (err) {
            return res.json({ message: "Server error" });
        }
        return res.json(result);
    });
});

app.post("/edit_todo/:ID", (req, res) => {
    const ID = req.params.ID;
    const sql = "UPDATE todo SET `TaskName`=?, `Due`=?, `Category`=?, `Urgency`=?, `Status`=? WHERE ID=?";
    const values = [req.body.TaskName, req.body.Due, req.body.Category, req.body.Urgency, req.body.Status, ID];
    db.query(sql, values, (err, result) => {
        if (err)
            return res.json({ message: "Something unexpected has occured"});
        return res.json({ success: "Task updated successfully"});
    });
});

app.delete("/delete_todo/:ID", (req, res) => {
    const ID = req.params.ID;  // Pastikan 'ID' sesuai dengan yang ada di URL
    const sql = "DELETE FROM todo WHERE ID=?";
    db.query(sql, [ID], (err, result) => {
        if (err) {
            console.log('Error during deletion:', err);
            return res.json({ message: "Something unexpected has occurred" + err });
        }
        return res.json({ success: "Task deleted successfully" });
    });
});

app.post("/add_myreadings", (req, res) => {
    const sql = "INSERT INTO myreadings (`Cover`, `Title`, `Author`, `FinishDate`, `Rating`, `Review`) VALUES (?, ?, ?, ?, ?, ?)";
    const readings = [
        req.body.Cover,
        req.body.Title,
        req.body.Author,
        req.body.FinishDate,
        req.body.Rating,
        req.body.Review,
    ];

    db.query(sql, readings, (err, result) => {
        if (err) {
            console.error('Query Error:', err);
            return res.status(500).json({ message: 'An error occurred', error: err });
        }
        return res.status(200).json({ success: 'Task added successfully', result });
    });
});

app.get("/myreadings", (req, res) => {
    const sql = "SELECT * FROM myreadings";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Query Error:", err);
            return res.status(500).json({ message: "Server error", error: err });
        }
        return res.status(200).json(result);
    });
});

app.get("/get_myreadings/:ID", (req, res) => {
    const ID = req.params.ID;
    const sql = "SELECT * FROM myreadings WHERE `ID`=?";
    db.query(sql, [ID], (err, result) => {
        if (err) {
            console.error("Query Error:", err);
            return res.status(500).json({ message: "Server error", error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json(result);
    });
});

app.post("/edit_myreadings/:ID", (req, res) => {
    const ID = req.params.ID;
    const sql = "UPDATE myreadings SET `Cover`=?, `Title`=?, `Author`=?, `FinishDate`=?, `Rating`=?, `Review`=? WHERE `ID`=?";
    const values = [
        req.body.Cover,
        req.body.Title,
        req.body.Author,
        req.body.FinishDate,
        req.body.Rating,
        req.body.Review,
        ID
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Query Error:", err);
            return res.status(500).json({ message: "An error occurred", error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({ success: "Book updated successfully" });
    });
});

app.delete("/delete_myreadings/:ID", (req, res) => {
    const ID = req.params.ID;
    const sql = "DELETE FROM myreadings WHERE `ID`=?";
    db.query(sql, [ID], (err, result) => {
        if(err){
            console.log('Error during deletion:', err);
            return res.json({ message: "Something unexpected has occurred" + err });
        }
        return res.json({ success: "Book deleted successfully"});
    });
});

app.post("/add_transaction", (req, res) => {
    const sql = "INSERT INTO transactions (`transaction_name`, `transaction_date`, `post_id`, `amount`) VALUES (?, ?, ?, ?)";
    const trans = [
        req.body.transaction_name,
        req.body.transaction_date,
        req.body.post_id,
        req.body.amount,
    ];
    db.query(sql, trans, (err, result) => {
        if (err) {
            console.error('Query Error:', err);
            return res.status(500).json({ message: 'An error occurred', error: err });
        }
        return res.status(200).json({ success: 'Task added successfully', result });
    });
});

app.post("/add_post", (req, res) => {
    const sql = "INSERT INTO posts (`post_name`, `target_limit`) VALUES (?, ?)";
    const post = [
        req.body.post_name,
        req.body.target_limit,
    ];
    db.query(sql, post, (err, result) => {
        if (err) {
            console.error('Query Error:', err);
            return res.status(500).json({ message: 'An error occurred', error: err });
        }
        return res.status(200).json({ success: 'Task added successfully', result });
    });
});

app.get("/show_months", (req, res) => {
    const sql = "SELECT * FROM months";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Query Error:", err);
            return res.status(500).json({ message: "Server error", error: err });
        }
        return res.status(200).json(result);
    });
});

app.delete("/delete_transaction/:transaction_id", (req, res) => {
    const transaction_id = req.params.transaction_id;
    const sql = "DELETE FROM transactions WHERE `transaction_id`=?";
    db.query(sql, [transaction_id], (err, result) => {
        if(err){
            console.log('Error during deletion:', err);
            return res.json({ message: "Something unexpected has occurred" + err });
        }
        return res.json({ success: "Book deleted successfully"});
    });
})

app.post("/add_course", (req, res) => {
    const sql = "INSERT INTO course (`CourseName`, `LecturerName`) VALUES (?, ?)";
    const course = [
        req.body.CourseName,
        req.body.LecturerName,
    ]
    db.query(sql, course, (err, result) => {
        if (err) {
            console.error('Query Error:', err);
            return res.status(500).json({ message: 'An error occurred', error: err });
        }
        return res.status(200).json({ success: 'Task added successfully', result });
    });
});

app.get("/show_courses", (req, res) => {
    const sql = "SELECT * FROM course"
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Query Error:", err);
            return res.status(500).json({ message: "Server error", error: err });
        }
        return res.status(200).json(result);
    });
});

app.get("/get_courses/:CourseID", (req, res) => {
    const CourseID = req.params.CourseID;
    const sql = "SELECT * FROM course WHERE `CourseID` = ?";
    db.query(sql, [CourseID], (err, result) => {
        if (err) {
            return res.json({ message: "Server error" });
        }
        return res.json(result);
    });
});

app.post("/add_meeting", (req, res) => {
    const sql = "INSERT INTO meetings (`Week`, `MeetingDate`, `CourseID`) VALUES (?, ?, ?)";
    const meeting = [
        req.body.Week,
        req.body.MeetingDate,
        req.body.CourseID, // CourseID yang dikirimkan dari frontend
    ];
    db.query(sql, meeting, (err, result) => {
        if (err) {
            console.error('Query Error:', err);
            return res.status(500).json({ message: 'An error occurred', error: err });
        }
        return res.status(200).json({ success: 'Meeting added successfully', result });
    });
});


app.get("/show_meeting", (req, res) => {
    const CourseID = req.query.CourseID;
    const sql = "SELECT * FROM meetings WHERE `CourseID`=?";
    db.query(sql, [CourseID], (err, result) => {
        if (err) {
            console.error("Query Error:", err);
            return res.status(500).json({ message: "Server error", error: err });
        }
        return res.status(200).json(result);
    });
});

app.post("/edit_notes/:MeetingID", (req, res) => {
    const MeetingID = req.params.MeetingID;
    const sql = "UPDATE meetings SET `Week`=?, `MeetingDate`=?, `Notes`=?, `FileLink`=?, `Title`=? WHERE `MeetingID`=?";
    const values = [
        req.body.Week,
        req.body.MeetingDate,
        req.body.Notes,
        req.body.FileLink,
        req.body.Title,
        MeetingID
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Query Error:", err);
            return res.status(500).json({ message: "An error occurred", error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({ success: "Book updated successfully" });
    });
});

app.get("/get_meeting/:MeetingID", (req, res) => {
    const MeetingID = req.params.MeetingID;
    const sql = "SELECT * FROM meetings WHERE `MeetingID` = ?";
    db.query(sql, [MeetingID], (err, result) => {
        if (err) {
            return res.json({ message: "Server error" });
        }
        return res.json(result);
    });
});

app.delete("/delete_meeting/:MeetingID", (req, res) => {
    const MeetingID = req.params.MeetingID;
    const sql = "DELETE FROM meetings WHERE `MeetingID`=?";
    db.query(sql, [MeetingID], (err, result) => {
        if(err){
            console.log('Error during deletion:', err);
            return res.json({ message: "Something unexpected has occurred" + err });
        }
        return res.json({ success: "Book deleted successfully"});
    });
});

app.delete("/delete_meetings_by_course/:CourseID", (req, res) => {
    const CourseID = req.params.CourseID;
    const sql = "DELETE FROM meetings WHERE `CourseID`=?";
    db.query(sql, [CourseID], (err, result) => {
        if(err){
            console.log('Error during deletion:', err);
            return res.json({ message: "Something unexpected has occurred" + err });
        }
        return res.json({ success: "Book deleted successfully"});
    });
});

app.delete("/delete_course/:CourseID", (req, res) => {
    const CourseID = req.params.CourseID;
    const sql = "DELETE FROM course WHERE `CourseID`=?";
    db.query(sql, [CourseID], (err, result) => {
        if(err){
            console.log('Error during deletion:', err);
            return res.json({ message: "Something unexpected has occurred" + err });
        }
        return res.json({ success: "Book deleted successfully"});
    });
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
