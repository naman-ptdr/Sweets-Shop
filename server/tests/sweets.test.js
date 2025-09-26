import request from 'supertest';
import app from '../index.js'; // make sure index.js exports app
import { connect, closeDatabase } from './setup.js';
import User from '../models/User.js';
import Sweet from '../models/Sweet.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

let adminToken, userToken;

beforeAll(async () => {
  await connect();

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await User.create({ name: 'Admin', email: 'admin@test.com', password: adminPassword, role: 'admin' });
  adminToken = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET);

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await User.create({ name: 'User', email: 'user@test.com', password: userPassword, role: 'user' });
  userToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
});

afterEach(async () => {
  // Keep users (tokens) created in beforeAll; only clear sweets between tests
  await Sweet.deleteMany();
});
afterAll(async () => await closeDatabase());

describe('Sweets API', () => {

  it('Admin can create a sweet', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Chocolate', category: 'Candy', price: 50, quantityInStock: 100 });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Chocolate');
  });

  it('User cannot create a sweet', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ name: 'Lollipop', category: 'Candy', price: 10, quantityInStock: 50 });
    expect(res.statusCode).toBe(403);
  });

  it('User can get all sweets', async () => {
    // First add a sweet via admin
    await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Candy', category: 'Candy', price: 20, quantityInStock: 50 });

    const res = await request(app)
      .get('/api/sweets')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it('User can purchase a sweet', async () => {
    const sweetRes = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Gum', category: 'Candy', price: 5, quantityInStock: 10 });

    const res = await request(app)
      .post(`/api/sweets/${sweetRes.body._id}/purchase`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantityInStock).toBe(9);
  });

});
