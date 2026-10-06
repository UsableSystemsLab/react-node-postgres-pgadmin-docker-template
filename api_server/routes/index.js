const apiRoutes = (router) => {
  /**
   * @swagger
   * /health:
   *   get:
   *     summary: Health check endpoint
   *     tags: [Health]
   *     responses:
   *       200:
   *         description: Returns the health status of the API
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: Healthy
   */
  router.get('/health', (req, res) => {
    res.status(200).json({ status: 'Healthy' });
  });

  // Add new route modules here, e.g.:
  // router.use('/users', UserRoutes);

  // Middleware to catch 404 errors
  router.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });
};

export default apiRoutes;
