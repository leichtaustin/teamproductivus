const PORT = process.env.PORT ?? 8000;
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


app.use(cors());
app.use(express.json());

//get goals
app.get('/goals/:userEmail', async (req, res) => {
const {userEmail} = req.params;

    try {
        const goals = await pool.query('SELECT * FROM goal_obj WHERE user_email = $1;', [userEmail]);
        res.json(goals.rows);
    } catch (err) {
        console.error(err);
    }
})

//signup

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
        const signUp = await pool.query(`INSERT INTO users (email, hashed_password) VALUES($1, $2)`,
        [email, hashedPassword]);
    } catch (err) {
        console.error(err);
        if (err) {
            res.json({detail: err.detail})
        }
    }

})

//login 

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (!users.rows.length) return res.json({detail: 'User does not exist'})

        const success = await bcrypt.compare(password, users.rows[0].hashed_password);
        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})
        if(success) {
            res.json({ 'email' : users.rows[0].email, token})
        } else {
            res.json({detail: 'Login failed'})
        }
    } catch (err) {
        console.error(err);
    }
})

//create a new goal
app.post('/goals', async (req, res) => {
    const { user_email, goal_name, target_value, current_value } = req.body;
    const id = uuidv4();
    try {
        const newGoal = await pool.query(`INSERT INTO goal_obj (id, user_email, goal_name, target_val, current_val) VALUES ($1, $2, $3, $4, $5);`,
            [id, user_email, goal_name, target_value, current_value]);
        res.json(newGoal);
    } catch (err) {
        console.error(err);
    }
})

// edit a goal 

app.put('/goals/:id', async (req, res) => {
    const { id } = req.params;
    const { user_email, goal_name, target_value, current_value, daily_value, sprint_id, last_update } = req.body;
    try {
        const editGoal = await pool.query(`UPDATE goal_obj SET user_email = $1, goal_name = $2, target_val = $3, current_val = $4, sprint_id = $5, last_update = $6, daily_val = $7 WHERE id = $8;`, 
            [user_email, goal_name, target_value, current_value, sprint_id, last_update, daily_value, id]);
        res.json(editGoal);
    } catch (err) {
        console.error(err);
    }
})

//delete a goal
app.delete('/goals/:id', async(req, res) => {
    const { id } =  req.params;
    try {
        const deleteGoal = await pool.query('DELETE FROM goal_obj WHERE id = $1;', [id]);
        res.json(deleteGoal);
    } catch (err) {
        console.error(err)
    }
})

//create a sprint
app.post('/sprints', async (req, res) => {
    const { sprint_name, sprint_start_date, sprint_end_date } = req.body;
    const id = uuidv4();
    try {
        const newSprint = await pool.query(`INSERT INTO sprints (id, sprint_name, sprint_start_date, sprint_end_date) VALUES ($1, $2, $3, $4);`,
            [id, sprint_name, sprint_start_date, sprint_end_date]);
        res.json(newSprint);
    } catch (err) {
        console.error(err);
    }
})

//get sprints
app.get('/sprints', async (req, res) => {
        try {
            const sprints = await pool.query('SELECT * FROM sprints;');
            res.json(sprints.rows);
        } catch (err) {
            console.error(err);
        }
    })

//delete a sprint
app.delete('/sprints/:id', async(req, res) => {
    const { id } =  req.params;
    try {
        const deleteSprint = await pool.query('DELETE FROM sprints WHERE id = $1;', [id]);
        res.json(deleteSprint);
    } catch (err) {
        console.error(err)
    }
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));