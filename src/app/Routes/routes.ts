import Auth from 'App/Http/Controllers/AuthController';
import DevicesController from 'App/Http/Controllers/DevicesController';
import NotesController from 'App/Http/Controllers/NotesController';
import PromptsController from 'App/Http/Controllers/PromptsController';
import TwilioHooksController from 'App/Http/Controllers/TwilioHooksController';
import AuthMiddleware from 'App/Http/Middlewares/AuthMiddleware';
import Route from 'Routes/Kernel';
import WebCallHooksController from 'App/Http/Controllers/WebCallHooksController';

export default Route;

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User signup
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User signup data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       200:
 *         description: User signup successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
Route.post('/auth/signup', Auth.handler(Auth, 'signup'));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User login data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: User login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
Route.post('/auth/login', Auth.handler(Auth, 'login'));


Route.batchMiddlewares([AuthMiddleware.name])([
  // Auth
  /**
   * @swagger
   * /check-authentication:
   *   get:
   *     summary: Check authentication status
   *     tags:
   *       - Authentication
   *     responses:
   *       200:
   *         description: User is authenticated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AuthenticationResponse'
   *       401:
   *         description: User is not authenticated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  Route.get('/check-authentication', () => 'authenticated'),

  /**
   * @swagger
   * /auth/logout:
   *   get:
   *     summary: User logout
   *     tags:
   *       - Authentication
   *     responses:
   *       200:
   *         description: User logout successful
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SuccessResponse'
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  Route.get('/auth/logout', Auth.handler(Auth, 'logout')),


  // Devices
  /**
   * @swagger
   * /devices/add:
   *   post:
   *     summary: Add a new device
   *     tags:
   *       - Devices
   *     requestBody:
   *       description: Device data
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Device'
   *     responses:
   *       200:
   *         description: Device added successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Device'
   *       400:
   *         description: Invalid request data
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  Route.post('/devices/add', DevicesController.handler(DevicesController, 'add')),


  // Prompts routes
  /**
   * @swagger
   * /prompts:
   *   get:
   *     summary: Get all prompts
   *     tags:
   *       - Prompts
   *     responses:
   *       200:
   *         description: List of prompts
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PromptListResponse'
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  Route.get('/prompts', PromptsController.handler(PromptsController, 'index')),

  // Notes routes
  /**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get all notes
 *     tags:
 *       - Notes
 *     responses:
 *       200:
 *         description: List of notes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoteListResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
  Route.get('/notes', NotesController.handler(NotesController, 'index')),

  /**
 * @swagger
 * /notes/bin:
 *   get:
 *     summary: Get all notes in the bin
 *     tags:
 *       - Notes
 *     responses:
 *       200:
 *         description: List of notes in the bin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoteListResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
  Route.get('/notes/bin', NotesController.handler(NotesController, 'indexBin')),

  /**
 * @swagger
 * /notes/summarize:
 *   post:
 *     summary: Summarize a note
 *     tags:
 *       - Notes
 *     requestBody:
 *       description: Note data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       200:
 *         description: Note summarized successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
  Route.post('/notes/summarize', NotesController.handler(NotesController, 'summarize')),

  /**
   * @swagger
   * /notes/{sid}:
   *   get:
   *     summary: Get a specific note
   *     tags:
   *       - Notes
   *     parameters:
   *       - in: path
   *         name: sid
   *         required: true
   *         description: The ID of the note
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Note found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Note'
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  Route.get('/notes/{sid}', NotesController.handler(NotesController, 'show')),

  /**
   * @swagger
   * /notes/stop/{sid}:
   *   get:
   *     summary: Stop a specific note
   *     tags:
   *       - Notes
   *     parameters:
   *       - in: path
   *         name: sid
   *         required: true
   *         description: The ID of the note
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Note stopped successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Note'
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  Route.get('/notes/stop/:sid', NotesController.handler(NotesController, 'stopNote')),
  
  /**
   * @swagger
   * /notes/stop/{sid}:
   *   get:
   *     summary: Pause a specific note
   *     tags:
   *       - Notes
   *     parameters:
   *       - in: path
   *         name: sid
   *         required: true
   *         description: The ID of the note
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Note paused successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Note'
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  Route.get('/notes/stop/:sid', NotesController.handler(NotesController, 'pauseNote')),

  
  /**
   * @swagger
   * /notes/bin/move/{sid}:
   *   get:
   *     summary: Move a specific note to the bin
   *     tags:
   *       - Notes
   *     parameters:
   *       - in: path
   *         name: sid
   *         required: true
   *         description: The ID of the note
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Note moved to bin successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Note'
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  Route.get('/notes/bin/move/:sid', NotesController.handler(NotesController, 'moveToBin')),

  /**
   * @swagger
   * /notes/bin/restore/{sid}:
   *   get:
   *     summary: Restore a specific note from the bin
   *     tags:
   *       - Notes
   *     parameters:
   *       - in: path
   *         name: sid
   *         required: true
   *         description: The ID of the note
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Note restored from bin successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Note'
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  Route.get('/notes/bin/restore/:sid', NotesController.handler(NotesController, 'restoreFromBin')),

  /**
   * @swagger
   * /notes/bin/delete/{sid}:
   *   delete:
   *     summary: Delete a specific note from the bin
   *     tags:
   *       - Notes
   *     parameters:
   *       - in: path
   *         name: sid
   *         required: true
   *         description: The ID of the note
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Note deleted from bin successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Note'
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  Route.delete('/notes/bin/delete/:sid', NotesController.handler(NotesController, 'deleteFromBin')),

  /**
   * @swagger
   * /notes/bin/empty:
   *   delete:
   *     summary: Empty the bin
   *     tags:
   *       - Notes
   *     responses:
   *       200:
   *         description: Bin emptied successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SuccessResponse'
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  Route.delete('/notes/bin/empty', NotesController.handler(NotesController, 'emptyBin')),

  /**
   * @swagger
   * /notes/edit/{sid}:
   *   patch:
   *     summary: Update a specific note
   *     tags:
   *       - Notes
   *     parameters:
   *       - in: path
   *         name: sid
   *         required: true
   *         description: The ID of the note
   *         schema:
   *           type: string
   *     requestBody:
   *       description: Updated note data
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Note'
   *     responses:
   *       200:
   *         description: Note updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Note'
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  Route.patch('/notes/edit/:sid', NotesController.handler(NotesController, 'update')),

  // Web call hooks
  /**
   * @swagger
   * /webhooks/web-call-init:
   *   post:
   *     summary: Initialize a web call
   *     tags:
   *       - Webhooks
   *     responses:
   *       200:
   *         description: Web call initialized successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SuccessResponse'
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  Route.post('/webhooks/web-call-init', WebCallHooksController.handler(WebCallHooksController, 'initCall')),
]);

/**
 * @swagger
 * /webhooks/voice:
 *   post:
 *     summary: Handle voice webhook
 *     tags:
 *       - Webhooks
 *     responses:
 *       200:
 *         description: Voice webhook handled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
Route.post('/webhooks/voice', TwilioHooksController.handler(TwilioHooksController, 'voiceHook'));

/**
 * @swagger
 * /webhooks/sms:
 *   post:
 *     summary: Handle SMS webhook
 *     tags:
 *       - Webhooks
 *     responses:
 *       200:
 *         description: SMS webhook handled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
Route.post('/webhooks/sms', TwilioHooksController.handler(TwilioHooksController, 'smsHook'));

/**
 * @swagger
 * /webhooks/error:
 *   post:
 *     summary: Handle error webhook
 *     tags:
 *       - Webhooks
 *     responses:
 *       200:
 *         description: Error webhook handled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
Route.post('/webhooks/error', TwilioHooksController.handler(TwilioHooksController, 'errorHook'));

/**
 * @swagger
 * /webhooks/delivery/sms:
 *   post:
 *     summary: Handle SMS delivery webhook
 *     tags:
 *       - Webhooks
 *     responses:
 *       200:
 *         description: SMS delivery webhook handled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
Route.post('/webhooks/delivery/sms', TwilioHooksController.handler(TwilioHooksController, 'smsDeliveryHook'));
