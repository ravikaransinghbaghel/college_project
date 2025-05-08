import massageModel from '../models/Massage.js'
import conversation from '../models/conversation.js'


export const sendmassage = async (req, resp) => {
    try {
        const senderId = req.user?.id;
        const recieverId = req.params.recieverId;
        const { massage } = req.body;
        console.log(senderId, recieverId, massage);

        if (!recieverId || !senderId || !massage) {
            return resp.status(404).json({ massage: "all field are required", });
        }

        let partiConver = await conversation.findOne({
            participants: { $all: [senderId, recieverId] }
        })

        if (!partiConver) {
            partiConver = await conversation.create({
                participants: [senderId, recieverId],

            });
        }
        const newMassage = new massageModel({
            receiverId: recieverId,
            senderId,
            massage,
        });
        await newMassage.save();

        if (newMassage) {
            partiConver.massages.push(newMassage._id);
            await partiConver.save();
        }
        resp.status(200).json({
            success: true,
            massage: newMassage
        });
    } catch (err) {
        console.error(err);
        resp.status(500).json({ message: 'Server error' });
    }

}

export const getmassage = async (req, resp) => {
    try {
        const myId = req.user.id;
        const recieverId = req.params.recieverId;


        if (!recieverId || !myId) {
            return resp.status(404).json({ massage: "all field are required" });
        }

        let conversationMass = await conversation.find({
            participants: { $all: [myId, recieverId] }
        }).populate("massages");

        resp.status(200).json({
            success: true,
            massages: conversationMass
        });
    } catch (err) {
        console.error(err);
        resp.status(500).json({ message: 'Server error' });
    }

}