// src/Login.js
/*
import React, { useState } from 'react';
import { auth } from './firebase'; // Importa l'autenticazione da firebase.js
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importa la funzione per il login
import { useNavigate } from 'react-router-dom'; // Importa useNavigate per il redirect
import './styles.css'; // Importa il CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Stato per il caricamento
  const navigate = useNavigate(); // Hook per il redirect

  // Funzione di login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Inizia il caricamento
    setError(''); // Resetta gli errori precedenti
    try {
      // Usa la funzione di login di Firebase
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful!');
      // Redirect alla pagina Home dopo un login riuscito
      navigate('/home'); // Usa navigate per il redirect
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    }
    setLoading(false); // Fine del caricamento
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
*/

import React, { useState } from 'react';
import { Input, Button, Form, message, Tabs } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { createClient } from '@supabase/supabase-js';
import './Login.css'; // File per lo stile
import { useNavigate } from 'react-router-dom';

const supabaseUrl = 'https://btvkhnecdcetfiaoozdt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0dmtobmVjZGNldGZpYW9vemR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwMTY3MzksImV4cCI6MjA1MzU5MjczOX0.KZZbe7QQWU2zQzEgMqe912SA0MWMp04_zk-bwytGQqU';
const supabase = createClient(supabaseUrl, supabaseKey);

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const { email, password } = values;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      message.success('Login effettuato con successo!');
      navigate('/home'); // Redirige alla home page
    } catch (error) {
      message.error(`Errore durante il login: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (values) => {
    const { email, password } = values;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      message.success('Registrazione completata! Ora puoi accedere.');
    } catch (error) {
      message.error(`Errore durante la registrazione: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Tabs defaultActiveKey="login">
          <Tabs.TabPane tab="Accedi" key="login">
            <Form
              name="login"
              onFinish={handleLogin}
              layout="vertical"
              size="large"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Per favore inserisci la tua email!' }]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Inserisci la tua email"
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Per favore inserisci la tua password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Inserisci la tua password"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                  Accedi
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Registrati" key="register">
            <Form
              name="register"
              onFinish={handleRegister}
              layout="vertical"
              size="large"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Per favore inserisci la tua email!' }]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Inserisci la tua email"
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Per favore inserisci la tua password!' },
                  { min: 6, message: 'La password deve contenere almeno 6 caratteri!' },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Inserisci la tua password"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                  Registrati
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
