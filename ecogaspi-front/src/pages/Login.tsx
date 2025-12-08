import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { theme } from '../styles/theme';
import { useAuth } from '../contexts/AuthContext';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  padding: ${theme.spacing.lg};
`;

const LoginCard = styled.div`
  background: white;
  padding: ${theme.spacing['3xl']};
  border-radius: ${theme.borderRadius.xl};
  border: 1px solid #e0e0e0;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};

  h1 {
    font-size: ${theme.typography.fontSize['2xl']};
    color: ${theme.colors.secondary.black};
    margin-bottom: ${theme.spacing.sm};
    font-weight: ${theme.typography.fontWeight.bold};
  }

  p {
    color: ${theme.colors.secondary.gray};
    font-size: ${theme.typography.fontSize.base};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const InputGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.secondary.darkGray};
  margin-bottom: ${theme.spacing.sm};
`;

const InputContainer = styled.div`
  position: relative;

  svg {
    position: absolute;
    left: ${theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.secondary.gray};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 3rem;
  border: 1px solid #e0e0e0;
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.base};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.green};
  }

  &:invalid {
    border-color: ${theme.colors.status.error};
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${theme.colors.secondary.gray};
  cursor: pointer;
  padding: ${theme.spacing.xs};

  &:hover {
    color: ${theme.colors.primary.green};
  }
`;

const RememberForgot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${theme.typography.fontSize.sm};
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  cursor: pointer;
  color: ${theme.colors.secondary.darkGray};

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: ${theme.colors.primary.green};
  }
`;

const ForgotLink = styled(Link)`
  color: ${theme.colors.primary.green};
  text-decoration: none;
  font-weight: ${theme.typography.fontWeight.medium};

  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, ${theme.colors.primary.green}, ${theme.colors.primary.lightGreen});
  color: white;
  padding: ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(4, 135, 78, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${theme.spacing.xl} 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${theme.colors.secondary.lightGray};
  }

  span {
    padding: 0 ${theme.spacing.md};
    color: ${theme.colors.secondary.gray};
    font-size: ${theme.typography.fontSize.sm};
  }
`;

const SignupPrompt = styled.div`
  text-align: center;
  color: ${theme.colors.secondary.gray};
  font-size: ${theme.typography.fontSize.base};

  a {
    color: ${theme.colors.primary.green};
    text-decoration: none;
    font-weight: ${theme.typography.fontWeight.semibold};

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  background: ${theme.colors.status.error}15;
  color: ${theme.colors.status.error};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.status.error}30;
  font-size: ${theme.typography.fontSize.sm};
  margin-bottom: ${theme.spacing.lg};
`;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(formData.email, formData.password);

      if (success) {
        navigate('/');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <LoginCard>
        <Header>
          <h1>Connexion</h1>
          <p>Connectez-vous à votre compte EcoGaspi</p>
        </Header>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">Adresse email</Label>
            <InputContainer>
              <Mail size={20} />
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="votre@email.com"
                required
              />
            </InputContainer>
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Mot de passe</Label>
            <InputContainer>
              <Lock size={20} />
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordToggle>
            </InputContainer>
          </InputGroup>

          <RememberForgot>
            <CheckboxContainer>
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
              Se souvenir de moi
            </CheckboxContainer>
            <ForgotLink to="/forgot-password">
              Mot de passe oublié ?
            </ForgotLink>
          </RememberForgot>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Connexion...' : 'Se connecter'}
            {!isLoading && <ArrowRight size={20} />}
          </SubmitButton>
        </Form>

        <Divider>
          <span>ou</span>
        </Divider>

        <SignupPrompt>
          Pas encore de compte ?{' '}
          <Link to="/register">Créer un compte</Link>
        </SignupPrompt>
      </LoginCard>
    </Container>
  );
};