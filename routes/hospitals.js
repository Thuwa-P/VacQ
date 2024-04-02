const express = require("express");
const {
  getHospitals,
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital,
  getVacCenters,
} = require("../controllers/hospitals");

//Include other resource router
const appointmentRouter = require("./appointments");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

//Re-route into other resource router
router.use("/:hospitalId/appointments/", appointmentRouter);

router.route("/vacCenters").get(getVacCenters);

router
  .route("/")
  .get(getHospitals)
  .post(protect, authorize("admin"), createHospital);
router
  .route("/:id")
  .get(getHospital)
  .put(protect, authorize("admin"), updateHospital)
  .delete(protect, authorize("admin"), deleteHospital);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Hospital:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - district
 *         - province
 *         - postalcode
 *         - region
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto generated id of hospital
 *           example: 660c0ecc269b729c2be4866e
 *         name:
 *           type: string
 *           description: hospital name
 *         address:
 *           type: string
 *           description: hospital address
 *         district:
 *           type: string
 *           description: hospital district
 *         province:
 *           type: string
 *           description: hospital province
 *         postalcode:
 *           type: string
 *           decriotion: hospital postal code
 *         tel:
 *           type: string
 *           description: hospital telephone number
 *         region:
 *           type: string
 *           description: hospital region
 *       example:
 *         id: 660c0ecc269b729c2be4866e
 *         name: Example Hospital
 *         address: 111 Pathumwan
 *         district: Pathumwan
 *         province: Bangkok
 *         postalcode: 10110
 *         tel: 02-1111111
 *         region: Bangkok
 */

/**
 * @swagger
 * tags:
 *   name: Hospitals
 *   description: The hospitals managing API
 */
/**
 * @swagger
 * /hospitals:
 *   get:
 *     summary: Returns the list of all the hospitals
 *     tags: [Hospitals]
 *     responses:
 *       200:
 *         description: list of the hospitals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hospital'
 */
/**
 * @swagger
 * /hospitals/{id}:
 *   get:
 *     summary: Get hospital by ID
 *     tags: [Hospitals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Hospital ID
 *     responses:
 *       200:
 *         description: The hospital descriptioned by ID
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hospital'
 *       404:
 *         description: The hospital was not found 
 */
/**
 * @swagger
 * /hospitals:
 *   post:
 *     summary: Create a new hospital
 *     tags: [Hospitals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hospital'
 *     responses:
 *       201:
 *         description: The hospital was successfully created
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hospital'
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /hospitals/{id}:
 *   put:
 *     summary: Update the hospital by ID
 *     tags: [Hospitals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Hoospital ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hospital'
 *     responses:
 *       200:
 *         description: The hospital was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hospital'
 *       404:
 *         description: Hospital not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /hospitals/{id}:
 *   delete:
 *     summary: Remove hospital by ID
 *     tags: [Hospitals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Hospital ID
 *     responses:
 *       200:
 *         description: The hospital was deleted
 *       404:
 *         description: The hospital was not found 
 */