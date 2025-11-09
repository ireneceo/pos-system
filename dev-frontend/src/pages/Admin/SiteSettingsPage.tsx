import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { Container, Header, Title, Content } from '../../components/UI/PageComponents';

const Form = styled.form`
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const Section = styled.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const HelpText = styled.p`
  font-size: 13px;
  color: #6B7280;
  margin-top: 8px;
`;

const ImagePreview = styled.div`
  margin-top: 12px;
  padding: 16px;
  background: #F8F9FA;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const PreviewImage = styled.img`
  max-width: 200px;
  max-height: 100px;
  border-radius: 4px;
  object-fit: contain;
`;

const RemoveButton = styled.button`
  padding: 8px 16px;
  background: #DC3545;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #C82333;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 32px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;

    &:hover {
      background: #5A51E6;
    }
  ` : `
    background: #F8F9FA;
    color: #6B7280;
    border: 1px solid #E6EBF1;

    &:hover {
      background: #EBEEF2;
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background: #D4EDDA;
  color: #155724;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  background: #F8D7DA;
  color: #721C24;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  font-size: 14px;
`;

interface SiteSettings {
  site_name: string;
  favicon_url: string;
  brand_logo_url: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  og_image_url: string;
}

const SiteSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: '',
    favicon_url: '',
    brand_logo_url: '',
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    og_image_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/site-settings');
      if (response.ok) {
        const data = await response.json();
        setSettings({
          site_name: data.site_name || '',
          favicon_url: data.favicon_url || '',
          brand_logo_url: data.brand_logo_url || '',
          seo_title: data.seo_title || '',
          seo_description: data.seo_description || '',
          seo_keywords: data.seo_keywords || '',
          og_image_url: data.og_image_url || ''
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setErrorMessage('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setSettings(prev => ({
        ...prev,
        [field]: base64
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (field: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        setSuccessMessage('Site settings saved successfully! SEO tags will be updated on next page load.');

        // Trigger brand logo update event if logo changed
        if (settings.brand_logo_url) {
          window.dispatchEvent(new Event('brandLogoUpdated'));
        }

        // Update document title and meta tags immediately
        if (settings.seo_title) {
          document.title = settings.seo_title;
        }
        if (settings.favicon_url) {
          updateFavicon(settings.favicon_url);
        }
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setErrorMessage('An error occurred while saving settings');
    } finally {
      setSaving(false);
    }
  };

  const updateFavicon = (url: string) => {
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = url;
  };

  if (loading) {
    return (
      <MainLayout>
        <Container>
          <Header>
            <Title>Site Settings</Title>
          </Header>
          <Content>
            <p>Loading...</p>
          </Content>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Site Settings</Title>
        </Header>
        <Content>
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

          <Form onSubmit={handleSubmit}>
            {/* Basic Settings */}
            <Section>
              <SectionTitle>Basic Settings</SectionTitle>

              <FormGroup>
                <Label htmlFor="site_name">Site Name</Label>
                <Input
                  type="text"
                  id="site_name"
                  name="site_name"
                  value={settings.site_name}
                  onChange={handleInputChange}
                  placeholder="OrderHere POS"
                />
                <HelpText>The name of your site/solution</HelpText>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="favicon">Favicon</Label>
                <Input
                  type="file"
                  id="favicon"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'favicon_url')}
                />
                <HelpText>Upload a favicon (ICO, PNG, or SVG recommended, 16x16 or 32x32 px)</HelpText>
                {settings.favicon_url && (
                  <ImagePreview>
                    <PreviewImage src={settings.favicon_url} alt="Favicon" />
                    <RemoveButton type="button" onClick={() => handleRemoveImage('favicon_url')}>
                      Remove
                    </RemoveButton>
                  </ImagePreview>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="brand_logo">Brand Logo</Label>
                <Input
                  type="file"
                  id="brand_logo"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'brand_logo_url')}
                />
                <HelpText>Upload your brand logo (will appear in sidebar and login page)</HelpText>
                {settings.brand_logo_url && (
                  <ImagePreview>
                    <PreviewImage src={settings.brand_logo_url} alt="Brand Logo" />
                    <RemoveButton type="button" onClick={() => handleRemoveImage('brand_logo_url')}>
                      Remove
                    </RemoveButton>
                  </ImagePreview>
                )}
              </FormGroup>
            </Section>

            {/* SEO Settings */}
            <Section>
              <SectionTitle>SEO Settings</SectionTitle>

              <FormGroup>
                <Label htmlFor="seo_title">SEO Title</Label>
                <Input
                  type="text"
                  id="seo_title"
                  name="seo_title"
                  value={settings.seo_title}
                  onChange={handleInputChange}
                  placeholder="OrderHere - Restaurant POS System"
                  maxLength={60}
                />
                <HelpText>Page title for search engines (50-60 characters recommended)</HelpText>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="seo_description">SEO Description</Label>
                <TextArea
                  id="seo_description"
                  name="seo_description"
                  value={settings.seo_description}
                  onChange={handleInputChange}
                  placeholder="Complete restaurant management solution with POS, ordering, and analytics"
                  maxLength={160}
                />
                <HelpText>Meta description for search engines (150-160 characters recommended)</HelpText>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="seo_keywords">SEO Keywords</Label>
                <Input
                  type="text"
                  id="seo_keywords"
                  name="seo_keywords"
                  value={settings.seo_keywords}
                  onChange={handleInputChange}
                  placeholder="restaurant pos, food ordering, restaurant management, pos system"
                />
                <HelpText>Comma-separated keywords for search engines</HelpText>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="og_image">Open Graph Image</Label>
                <Input
                  type="file"
                  id="og_image"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'og_image_url')}
                />
                <HelpText>Image for social media sharing (1200x630 px recommended)</HelpText>
                {settings.og_image_url && (
                  <ImagePreview>
                    <PreviewImage src={settings.og_image_url} alt="OG Image" />
                    <RemoveButton type="button" onClick={() => handleRemoveImage('og_image_url')}>
                      Remove
                    </RemoveButton>
                  </ImagePreview>
                )}
              </FormGroup>
            </Section>

            <ButtonGroup>
              <Button type="button" variant="secondary" onClick={fetchSettings}>
                Reset
              </Button>
              <Button type="submit" variant="primary" disabled={saving}>
                {saving ? 'Saving...' : 'Save Settings'}
              </Button>
            </ButtonGroup>
          </Form>
        </Content>
      </Container>
    </MainLayout>
  );
};

export default SiteSettingsPage;
