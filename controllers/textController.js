const Text = require('../models/Text');

class TextController {
    async addText(req, res) {
        try{
            const { value } = req.body;

            let text = await Text.findOne({value});

            if (text) {
                return res.status(400).json({message: "Text is already exist in database"});
            }

            text = Text({value});
            await text.save();
            return res.status(201).json(text);
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    async getTexts(req, res){
        try{
            const data = await Text.find({});

            return res.status(200).json(data);
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    async getRandomText(req, res) {
        try{
            const data = await Text.find({});

            const itemsCnt = data.length;
            const randomItemIdx = Math.floor(Math.random() * itemsCnt);

            return res.status(200).json(data[randomItemIdx]);

        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    async deleteText(req, res){
        try{
            const {value} = req.body;

            const deletedText = await Text.findOneAndDelete({value}, {new: true});
            if (!deletedText){
                return res.status(404).json({message: "Text with current value does not exist"});
            }

            return res.status(200).json(deletedText);
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    async patchText(req, res) {
        try{
            const {currentValue, updatedValue} = req.body;
            const fieldsToUpdate = {};

            if (updatedValue) {
                fieldsToUpdate.value = updatedValue;
            }

            const updatedText = await Text.findOneAndUpdate({value: currentValue}, fieldsToUpdate, {new: true});

            if (!updatedText){
                return res.status(404).json({message: "Text with current value does not exist"});
            }

            return res.status(200).json(updatedText);
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }
}

module.exports = TextController;