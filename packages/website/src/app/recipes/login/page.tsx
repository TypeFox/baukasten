'use client';

import PageLayout from '@/components/PageLayout';
import { Showcase } from '@/components/ComponentShowcase';
import { Button, Input, Checkbox, Label, Heading, Text, Icon, Divider } from 'baukasten-ui/core';
import { useState } from 'react';

export default function LoginRecipesPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <PageLayout
      title="Login Page Recipes"
      description="Complete login page examples ready to use in your applications. Each design showcases different layouts and patterns."
    >
      <Showcase
        title="Simple Centered Login"
        description="A clean, centered login form with email and password fields. Perfect for minimalist applications."
        preview={
          <div style={{
            minHeight: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--bk-color-background)',
            padding: 'var(--bk-spacing-8)',
          }}>
            <div style={{
              width: '100%',
              maxWidth: '400px',
              padding: 'var(--bk-spacing-8)',
              backgroundColor: 'var(--bk-color-background-secondary)',
              border: '1px solid var(--bk-color-border)',
              borderRadius: 'var(--bk-radius-lg)',
            }}>
              <div style={{ textAlign: 'center', marginBottom: 'var(--bk-spacing-6)' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  margin: '0 auto var(--bk-spacing-4)',
                  background: 'linear-gradient(135deg, var(--bk-color-primary) 0%, var(--bk-color-primary-hover) 100%)',
                  borderRadius: 'var(--bk-radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon name="account" style={{ color: 'var(--bk-color-primary-foreground)', fontSize: '28px' }} />
                </div>
                <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-2)', textAlign: 'center' }}>
                  Welcome Back
                </Heading>
                <Text style={{ color: 'var(--bk-color-foreground-muted)' }}>
                  Sign in to your account
                </Text>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
                <div>
                  <Text style={{ display: 'block', marginBottom: 'var(--bk-spacing-2)', fontWeight: 500 }}>
                    Email
                  </Text>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                  />
                </div>

                <div>
                  <Text style={{ display: 'block', marginBottom: 'var(--bk-spacing-2)', fontWeight: 500 }}>
                    Password
                  </Text>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Label variant="checkbox" size="md">
                    <Checkbox />
                    <span>Remember me</span>
                  </Label>
                  <Button variant="link" size="sm">Forgot password?</Button>
                </div>

                <Button variant="primary" width="block">
                  Sign In
                </Button>

                <Text style={{ textAlign: 'center', color: 'var(--bk-color-foreground-muted)', fontSize: 'var(--bk-font-size-sm)' }}>
                  Don't have an account? <Button variant="link" size="sm">Sign up</Button>
                </Text>
              </div>
            </div>
          </div>
        }
        code={`import { Button, Input, Checkbox, Label, Heading, Text, Icon } from 'baukasten-ui/core';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bk-color-background)',
      padding: 'var(--bk-spacing-8)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: 'var(--bk-spacing-8)',
        backgroundColor: 'var(--bk-color-background-secondary)',
        border: '1px solid var(--bk-color-border)',
        borderRadius: 'var(--bk-radius-lg)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--bk-spacing-6)' }}>
          <div style={{
            width: '56px',
            height: '56px',
            margin: '0 auto var(--bk-spacing-4)',
            background: 'linear-gradient(135deg, var(--bk-color-primary) 0%, var(--bk-color-primary-hover) 100%)',
            borderRadius: 'var(--bk-radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Icon name="account" style={{ color: 'var(--bk-color-primary-foreground)', fontSize: '28px' }} />
          </div>
          <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-2)', textAlign: 'center' }}>
            Welcome Back
          </Heading>
          <Text style={{ color: 'var(--bk-color-foreground-muted)' }}>
            Sign in to your account
          </Text>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
          <div>
            <Text style={{ display: 'block', marginBottom: 'var(--bk-spacing-2)', fontWeight: 500 }}>
              Email
            </Text>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              width="block"
            />
          </div>

          <div>
            <Text style={{ display: 'block', marginBottom: 'var(--bk-spacing-2)', fontWeight: 500 }}>
              Password
            </Text>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              width="block"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Label variant="checkbox" size="md">
              <Checkbox />
              <span>Remember me</span>
            </Label>
            <Button variant="link" size="sm">Forgot password?</Button>
          </div>

          <Button variant="primary" width="block">
            Sign In
          </Button>

          <Text style={{ textAlign: 'center', color: 'var(--bk-color-foreground-muted)' }}>
            Don't have an account? <Button variant="link" size="sm">Sign up</Button>
          </Text>
        </div>
      </div>
    </div>
  );
}`}
      />

      <Showcase
        title="Split Screen Login"
        description="A modern split-screen design with branding on one side and login form on the other. Great for marketing-focused applications."
        preview={
          <div style={{
            minHeight: '500px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0,
            backgroundColor: 'var(--bk-color-background)',
          }}>
            {/* Left Side - Branding */}
            <div style={{
              padding: 'var(--bk-spacing-8)',
              background: 'linear-gradient(135deg, var(--bk-color-primary) 0%, var(--bk-color-primary-hover) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'var(--bk-color-primary-foreground)',
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                marginBottom: 'var(--bk-spacing-6)',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 'var(--bk-radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon name="rocket" style={{ fontSize: '40px' }} />
              </div>
              <Heading level={2} style={{ marginBottom: 'var(--bk-spacing-3)', color: 'inherit' }}>
                Baukasten
              </Heading>
              <Text style={{ textAlign: 'center', maxWidth: '300px', opacity: 0.9, color: 'var(--bk-color-primary-foreground)' }}>
                Build beautiful applications with Baukasten UI
              </Text>
            </div>

            {/* Right Side - Form */}
            <div style={{
              padding: 'var(--bk-spacing-8)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: 'var(--bk-color-background-secondary)',
            }}>
              <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
                <Heading level={3} style={{ marginBottom: 'var(--bk-spacing-2)' }}>
                  Sign In
                </Heading>
                <Text style={{ color: 'var(--bk-color-foreground-muted)', marginBottom: 'var(--bk-spacing-6)' }}>
                  Enter your credentials to continue
                </Text>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
                  <Input
                    type="email"
                    placeholder="Email address"
                    width="block"
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    width="block"
                  />
                  <Button variant="primary" width="block">
                    Continue
                  </Button>

                  <div style={{ position: 'relative', textAlign: 'center', margin: 'var(--bk-spacing-4) 0' }}>
                    <Divider />
                    <span style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: 'var(--bk-color-background-secondary)',
                      padding: '0 var(--bk-spacing-3)',
                      color: 'var(--bk-color-foreground-muted)',
                      fontSize: 'var(--bk-font-size-sm)',
                    }}>
                      OR
                    </span>
                  </div>

                  <Button variant="secondary" width="block">
                    <Icon name="github" style={{ marginRight: 'var(--bk-spacing-2)' }} />
                    Sign in with GitHub
                  </Button>
                </div>
              </div>
            </div>
          </div>
        }
        code={`import { Button, Input, Heading, Text, Icon, Divider } from 'baukasten-ui/core';

function SplitLoginPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 0,
    }}>
      {/* Left Side - Branding */}
      <div style={{
        padding: 'var(--bk-spacing-8)',
        background: 'linear-gradient(135deg, var(--bk-color-primary) 0%, var(--bk-color-primary-hover) 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'var(--bk-color-primary-foreground)',
      }}>
        <Icon name="rocket" style={{ fontSize: '80px', marginBottom: 'var(--bk-spacing-6)' }} />
        <Heading level={2} style={{ marginBottom: 'var(--bk-spacing-3)', color: 'inherit' }}>
          Baukasten
        </Heading>
        <Text style={{ textAlign: 'center', maxWidth: '300px', opacity: 0.9 }}>
          Build beautiful applications Baukasten UI
        </Text>
      </div>

      {/* Right Side - Form */}
      <div style={{
        padding: 'var(--bk-spacing-8)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'var(--bk-color-background-secondary)',
      }}>
        <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
          <Heading level={3}>Sign In</Heading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-4)' }}>
            <Input type="email" placeholder="Email address" width="block" />
            <Input type="password" placeholder="Password" width="block" />
            <Button variant="primary" width="block">Continue</Button>
            
            <div style={{ position: 'relative', textAlign: 'center', margin: 'var(--bk-spacing-4) 0' }}>
              <Divider />
              <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'var(--bk-color-background-secondary)', padding: '0 var(--bk-spacing-3)' }}>
                OR
              </span>
            </div>

            <Button variant="secondary" width="block">
              <Icon name="github" style={{ marginRight: 'var(--bk-spacing-2)' }} />
              Sign in with GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}`}
      />

      <Showcase
        title="Compact Login Card"
        description="A minimal, compact login form perfect for modals or embedded authentication."
        preview={
          <div style={{
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--bk-color-background)',
            padding: 'var(--bk-spacing-6)',
          }}>
            <div style={{
              width: '100%',
              maxWidth: '350px',
              padding: 'var(--bk-spacing-6)',
              backgroundColor: 'var(--bk-color-background-secondary)',
              border: '1px solid var(--bk-color-border)',
              borderRadius: 'var(--bk-radius-md)',
            }}>
              <Heading level={4} style={{ marginBottom: 'var(--bk-spacing-4)' }}>
                Sign In
              </Heading>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
                <Input
                  type="email"
                  placeholder="Email"
                  size="sm"
                  width="block"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  size="sm"
                  width="block"
                />
                <div style={{ display: 'flex', gap: 'var(--bk-spacing-2)' }}>
                  <Button variant="primary" size="sm" width="block">
                    Sign In
                  </Button>
                  <Button variant="secondary" size="sm" width="block">
                    Cancel
                  </Button>
                </div>
                <Button variant="link" size="xs" style={{ alignSelf: 'center' }}>
                  Forgot password?
                </Button>
              </div>
            </div>
          </div>
        }
        code={`import { Button, Input, Heading } from 'baukasten-ui/core';

function CompactLogin() {
  return (
    <div style={{
      width: '100%',
      maxWidth: '350px',
      padding: 'var(--bk-spacing-6)',
      backgroundColor: 'var(--bk-color-background-secondary)',
      border: '1px solid var(--bk-color-border)',
      borderRadius: 'var(--bk-radius-md)',
    }}>
      <Heading level={4} style={{ marginBottom: 'var(--bk-spacing-4)' }}>
        Sign In
      </Heading>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bk-spacing-3)' }}>
        <Input type="email" placeholder="Email" size="sm" width="block" />
        <Input type="password" placeholder="Password" size="sm" width="block" />
        <div style={{ display: 'flex', gap: 'var(--bk-spacing-2)' }}>
          <Button variant="primary" size="sm" width="block">Sign In</Button>
          <Button variant="secondary" size="sm" width="block">Cancel</Button>
        </div>
        <Button variant="link" size="xs" style={{ alignSelf: 'center' }}>
          Forgot password?
        </Button>
      </div>
    </div>
  );
}`}
      />
    </PageLayout>
  );
}
