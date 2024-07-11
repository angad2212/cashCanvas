const express = require('express');
const FinancialRecordModel = require('../schema/financialRecord');

const router = express.Router();
router.get('/getAllByUserId/:userId', async (req,res)=>{
    try {
        const userId = req.params.userId;
        const records = await FinancialRecordModel.find({ userId: userId });
        if (records.length === 0) {
          return res.status(404).send("No records found!");
        }
        res.status(200).send(records); //if found the records
      } catch (err) {
        res.status(500).send(err); //error
      }
})

router.post('/', async (req,res)=>{
    try {
        const RecordBody = req.body
        const newRecord = new FinancialRecordModel(RecordBody)
        const savedRecord = await newRecord.save()
        return res.status(200).send(savedRecord)
      } catch (err) {
        res.status(500).send(err); //error
      }
})

router.put("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const newRecordBody = req.body;
      const record = await FinancialRecordModel.findByIdAndUpdate(
        id,
        newRecordBody,
        { new: true }
      );
  
      if (!record) return res.status(404).send();
  
      res.status(200).send(record);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const record = await FinancialRecordModel.findByIdAndDelete(id);
        if (!record) return res.status(404).send();
        res.status(200).send(record);
      } catch (err) {
        res.status(500).send(err);
      }
  });

module.exports = router;