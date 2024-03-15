const router = require("express").Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/addnew', async (req, res) => {
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
            newRole = await prisma.clients.create({
                data: {
                    userId:newUser.userId,
                    landsize:data.landsize,
                    address:data.address

                },
            });
            console.log(newRole);
        } else if (data.role === 'LABOUR') {
            newUser = await prisma.User.create({
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
                    userId: newUser.userId,
                    equipment: data.equipment,
                    ratings:0,
                    rate:data.rate,
                    status: "ACTIVE"
                    
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
router.post('/login', async (req, res) => {
    try {
        let receivedData = req.body;
        receivedData.ratings=0;
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


//contact 
router.post('/contact',async(req,res)=>{
    try {
        const data = req.body;
        console.log(data.name);
        console.log(data.email);
        console.log(data.phone);
        console.log(data.message);
        const mes = await prisma.contactus.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                msg: data.msg,
            },
        });
        res.status(200).json({ message: 'got it thanks', });
        console.log(mes);
}
 catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Error adding user' });
    }
});

router.post('/contactus', async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        let newUser;

            newUser = await prisma.contactus.create({
                data: {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    msg: data.msg,
                },
            });
           
            // console.log(newRole);
        
        console.log("got it:", newUser);
        res.status(200).json({ message: 'got it', user: newUser });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Error adding user' });
    }
});


//example to delete the data can do similar but i used params  http://localhost:3000/delete/ganesh@gmail.com
router.delete('/delete/:email', async (req, res) => {
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
router.put('/update/:email', async (req, res) => {
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

module.exports = router;