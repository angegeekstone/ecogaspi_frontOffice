import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, MapPin } from 'lucide-react';
import { theme } from '../styles/theme';
import { useAuth } from '../contexts/AuthContext';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${theme.colors.primary.green}15 0%, ${theme.colors.primary.lightGreen}10 100%);
  padding: ${theme.spacing.lg};
`;

const RegisterCard = styled.div`
  background: white;
  padding: ${theme.spacing['2xl']};
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${theme.colors.primary.orange}, ${theme.colors.primary.green});
    border-radius: 20px 20px 0 0;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};

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
  gap: ${theme.spacing.md};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.secondary.darkGray};
  margin-bottom: ${theme.spacing.xs};
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
  border: 2px solid ${theme.colors.secondary.lightGray};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.base};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.green};
    box-shadow: 0 0 0 4px ${theme.colors.primary.green}15;
  }

  &:invalid {
    border-color: ${theme.colors.status.error};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 3rem;
  border: 2px solid ${theme.colors.secondary.lightGray};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.base};
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.green};
    box-shadow: 0 0 0 4px ${theme.colors.primary.green}15;
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
  border-radius: ${theme.borderRadius.sm};

  &:hover {
    color: ${theme.colors.primary.green};
    background: ${theme.colors.secondary.lightGray};
  }
`;

const PasswordStrength = styled.div<{ strength: number }>`
  height: 4px;
  background: ${theme.colors.secondary.lightGray};
  border-radius: 2px;
  margin-top: ${theme.spacing.xs};
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => (props.strength / 4) * 100}%;
    background: ${props => {
      if (props.strength <= 1) return theme.colors.status.error;
      if (props.strength <= 2) return theme.colors.status.warning;
      if (props.strength <= 3) return theme.colors.primary.orange;
      return theme.colors.status.success;
    }};
    transition: all 0.3s ease;
  }
`;

const PasswordHint = styled.p`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.secondary.gray};
  margin-top: ${theme.spacing.xs};
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  cursor: pointer;
  color: ${theme.colors.secondary.darkGray};
  font-size: ${theme.typography.fontSize.sm};
  line-height: 1.5;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: ${theme.colors.primary.green};
    margin-top: 2px;
  }

  a {
    color: ${theme.colors.primary.green};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
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
  margin-top: ${theme.spacing.md};

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

const LoginPrompt = styled.div`
  text-align: center;
  color: ${theme.colors.secondary.gray};
  font-size: ${theme.typography.fontSize.base};
  margin-top: ${theme.spacing.lg};

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

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return Math.min(strength, 4);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setIsLoading(false);
      return;
    }

    if (passwordStrength < 3) {
      setError('Le mot de passe doit être plus sécurisé');
      setIsLoading(false);
      return;
    }

    if (!formData.acceptTerms) {
      setError('Vous devez accepter les conditions d\'utilisation');
      setIsLoading(false);
      return;
    }

    try {
      const success = await register(formData);

      if (success) {
        navigate('/');
      } else {
        setError('Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer.');
      }
    } catch (err) {
      setError('Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const ivorianCities = [
    'Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'San-Pédro', 'Korhogo', 'Man',
    'Divo', 'Gagnoa', 'Abengourou', 'Anyama', 'Agboville', 'Grand-Bassam'
  ];

  return (
    <Container>
      <RegisterCard>
        <Header>
          <h1>Créer un compte</h1>
          <p>Rejoignez EcoGaspi et luttez contre le gaspillage</p>
        </Header>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <Row>
            <InputGroup>
              <Label htmlFor="firstName">Prénom</Label>
              <InputContainer>
                <User size={20} />
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Votre prénom"
                  required
                />
              </InputContainer>
            </InputGroup>

            <InputGroup>
              <Label htmlFor="lastName">Nom</Label>
              <InputContainer>
                <User size={20} />
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Votre nom"
                  required
                />
              </InputContainer>
            </InputGroup>
          </Row>

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

          <Row>
            <InputGroup>
              <Label htmlFor="phone">Téléphone</Label>
              <InputContainer>
                <Phone size={20} />
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+225 XX XX XX XX XX"
                  required
                />
              </InputContainer>
            </InputGroup>

            <InputGroup>
              <Label htmlFor="city">Ville</Label>
              <InputContainer>
                <MapPin size={20} />
                <Select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Choisir une ville</option>
                  {ivorianCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </Select>
              </InputContainer>
            </InputGroup>
          </Row>

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
            <PasswordStrength strength={passwordStrength} />
            <PasswordHint>
              Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre
            </PasswordHint>
          </InputGroup>

          <InputGroup>
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <InputContainer>
              <Lock size={20} />
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordToggle>
            </InputContainer>
          </InputGroup>

          <CheckboxContainer>
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              required
            />
            J'accepte les{' '}
            <Link to="/terms">conditions d'utilisation</Link>
            {' '}et la{' '}
            <Link to="/privacy">politique de confidentialité</Link>
          </CheckboxContainer>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Création du compte...' : 'Créer mon compte'}
            {!isLoading && <ArrowRight size={20} />}
          </SubmitButton>
        </Form>

        <LoginPrompt>
          Déjà un compte ?{' '}
          <Link to="/login">Se connecter</Link>
        </LoginPrompt>
      </RegisterCard>
    </Container>
  );
};