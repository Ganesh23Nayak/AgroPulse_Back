const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


//expample to add user
// for insomia{
// 	"name":"Manesh",
// 	"email":"manesh@gmail.com"
// }

app.post('/addnew', async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        let newUser;
        let newRole;
        if (data.role === 'CUSTOMER') {
            newUser = await prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    phone: data.phone,
                    role: 'CUSTOMER',
                },
            });
            // console.log(newUser);
            newRole = await prisma.customer.create({
                data: {
                    userId:newUser.userId
                },
            });
            // console.log(newRole);
        } else if (data.role === 'LABOUR') {
            newUser = await prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    phone: data.phone,
                    role: 'LABOUR',
                },
            });
            //  console.log(newUser);
            newRole = await prisma.labour.create({
                data: {
                    userId: newUser.userId
                }
            });
            // console.log("User created")
            //  console.log(newRole);
        } else if (data.role === 'ADMIN') {
            newUser = await prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    phone: data.phone,
                    role: 'ADMIN',
                },
            });
            newRole = await prisma.admin.create({
                data: {
                    userId: newUser.userId
                }
            });
        } else {
            newUser = await prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    phone: data.phone,
                    role: 'USER',
                },
            });
        }
        console.log("User added successfully:", newUser);
        res.status(200).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Error adding user' });
    }
});


// login
app.post('/login', async (req, res) => {
    try {
        const receivedData = req.body;
        console.log(receivedData)
        const user = await prisma.user.findUnique({
          where: {
            email: receivedData.email,
          },
        });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        if (user.password !== receivedData.password) {
          return res.status(401).json({ error: 'Invalid password' });
        }
        res.status(200).json({ message: 'Login successful', user: user });
        console.log(user);
      } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in' });
      }
    })


//example to delete the data can do similar but i used params  http://localhost:3000/delete/ganesh@gmail.com
app.delete('/delete/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const deletedUser = await prisma.user.delete({
            where: {
                email: email
            }
        });
        console.log("User deleted successfully:", deletedUser);
        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Error deleting user' });
    }
});


//update the user
//http://localhost:3000/update/sanesh@gmail.com in insomia and in body {
//     "name": "suresh"
// }
app.put('/update/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const userData = req.body;
        const updatedUser = await prisma.user.update({
            where: {
                email: email
            },
            data: userData
        });
        console.log("User updated successfully:", updatedUser);
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Error updating user' });
    }
});
