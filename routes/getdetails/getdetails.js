const router = require("express").Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/getdetails', async (req, res) => {
    try {
        const clients = await prisma.clients.findMany();  
        res.status(200).json(clients);
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ error: 'Error fetching clients' });
    }
})



router.get('/getlabour', async (req, res) => {
    try {
        const labour = await prisma.labour.findMany({
            include: {
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });  
        console.log("first")
        res.status(200).json({data:labour});
    } catch (error) {
        console.error('Error fetching labour:', error);
        res.status(500).json({ error: 'Error fetching labour' });
    }
});





module.exports = router;