import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';

const Container = styled.div`
  background: #FAFBFC;
  min-height: 100vh;
  padding: 24px;
`;

const Header = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #6B7C93;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    border-color: #C7D2FE;
    color: #635BFF;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SettingsCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  height: fit-content;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 20px 0;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #0A2540;
  cursor: pointer;
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  margin-top: 20px;
  
  &:hover {
    background: #5243E0;
  }
`;

const TablesCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`;

const TablesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const TableItem = styled.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  transition: all 0.15s;
  
  &:hover {
    border-color: #C7D2FE;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

const TableNumber = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`;

const QRContainer = styled.div`
  margin: 16px 0;
  display: flex;
  justify-content: center;
`;

const TableActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  font-size: 12px;
  border: 1px solid #E6EBF1;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    border-color: #635BFF;
    color: #635BFF;
  }
`;

const AddTableButton = styled.button`
  width: 100%;
  padding: 40px;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
  background: #FAFBFC;
  color: #6B7C93;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    border-color: #C7D2FE;
    color: #635BFF;
    background: #F6F9FC;
  }
`;

const HelpText = styled.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 8px;
`;

interface Table {
  id: string;
  number: number;
  qrCode: string;
  isActive: boolean;
}

const TableManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    enableTableNumbers: true,
    tableNumberRequired: false,
    tablePrefix: 'T',
    totalTables: 20,
    qrCodeBaseUrl: window.location.origin
  });
  
  const [tables, setTables] = useState<Table[]>([]);
  
  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('tableSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    
    // Load tables from localStorage
    const savedTables = localStorage.getItem('tables');
    if (savedTables) {
      setTables(JSON.parse(savedTables));
    } else {
      // Generate initial tables
      generateTables(settings.totalTables);
    }
  }, []);
  
  const generateTables = (count: number) => {
    const newTables: Table[] = [];
    for (let i = 1; i <= count; i++) {
      const tableNumber = `${settings.tablePrefix}${String(i).padStart(3, '0')}`;
      const qrData = `${settings.qrCodeBaseUrl}/mobile?table=${tableNumber}`;
      newTables.push({
        id: `table-${i}`,
        number: i,
        qrCode: qrData,
        isActive: true
      });
    }
    setTables(newTables);
  };
  
  const handleSaveSettings = () => {
    localStorage.setItem('tableSettings', JSON.stringify(settings));
    
    // Regenerate tables if count changed
    if (tables.length !== settings.totalTables) {
      generateTables(settings.totalTables);
    }
    
    alert('Table settings saved successfully!');
  };
  
  const handleDownloadQR = (table: Table) => {
    const canvas = document.getElementById(`qr-${table.id}`) as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `table-${settings.tablePrefix}${String(table.number).padStart(3, '0')}-qr.png`;
      link.href = url;
      link.click();
    }
  };
  
  const handlePrintQR = (table: Table) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      const tableNumber = `${settings.tablePrefix}${String(table.number).padStart(3, '0')}`;
      printWindow.document.write(`
        <html>
          <head>
            <title>Table ${tableNumber} QR Code</title>
            <style>
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
              }
              h1 { margin-bottom: 20px; }
              .qr-container { margin: 20px 0; }
              @media print {
                body { height: auto; }
              }
            </style>
          </head>
          <body>
            <h1>Table ${tableNumber}</h1>
            <div class="qr-container">
              <canvas id="qr-print"></canvas>
            </div>
            <p>Scan to order from this table</p>
          </body>
        </html>
      `);
      
      printWindow.document.close();
      
      // Draw QR code in print window
      const canvas = document.getElementById(`qr-${table.id}`) as HTMLCanvasElement;
      const printCanvas = printWindow.document.getElementById('qr-print') as HTMLCanvasElement;
      if (canvas && printCanvas) {
        const ctx = printCanvas.getContext('2d');
        printCanvas.width = canvas.width;
        printCanvas.height = canvas.height;
        ctx?.drawImage(canvas, 0, 0);
      }
      
      printWindow.print();
    }
  };
  
  return (
    <Container>
      <Header>
        <Title>Table Management</Title>
        <BackButton onClick={() => navigate('/pos/settings')}>
          ← Back to Settings
        </BackButton>
      </Header>
      
      <Content>
        <SettingsCard>
          <SectionTitle>Table Settings</SectionTitle>
          
          <FormGroup>
            <CheckboxLabel>
              <Checkbox
                type="checkbox"
                checked={settings.enableTableNumbers}
                onChange={(e) => setSettings({...settings, enableTableNumbers: e.target.checked})}
              />
              Enable Table Numbers
            </CheckboxLabel>
            <HelpText>Allow customers to select table numbers when ordering</HelpText>
          </FormGroup>
          
          <FormGroup>
            <CheckboxLabel>
              <Checkbox
                type="checkbox"
                checked={settings.tableNumberRequired}
                onChange={(e) => setSettings({...settings, tableNumberRequired: e.target.checked})}
                disabled={!settings.enableTableNumbers}
              />
              Table Number Required
            </CheckboxLabel>
            <HelpText>Make table number selection mandatory for dine-in orders</HelpText>
          </FormGroup>
          
          <FormGroup>
            <Label>Table Prefix</Label>
            <Input
              type="text"
              value={settings.tablePrefix}
              onChange={(e) => setSettings({...settings, tablePrefix: e.target.value})}
              placeholder="e.g., T, TABLE"
            />
            <HelpText>Prefix for table numbers (e.g., T001, TABLE001)</HelpText>
          </FormGroup>
          
          <FormGroup>
            <Label>Number of Tables</Label>
            <Input
              type="number"
              value={settings.totalTables}
              onChange={(e) => setSettings({...settings, totalTables: parseInt(e.target.value) || 1})}
              min="1"
              max="999"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>QR Code Base URL</Label>
            <Input
              type="text"
              value={settings.qrCodeBaseUrl}
              onChange={(e) => setSettings({...settings, qrCodeBaseUrl: e.target.value})}
              placeholder="https://yourdomain.com"
            />
            <HelpText>Base URL for QR codes (usually your domain)</HelpText>
          </FormGroup>
          
          <SaveButton onClick={handleSaveSettings}>
            Save Settings
          </SaveButton>
        </SettingsCard>
        
        <TablesCard>
          <SectionTitle>Table QR Codes</SectionTitle>
          
          <TablesGrid>
            {tables.map(table => {
              const tableNumber = `${settings.tablePrefix}${String(table.number).padStart(3, '0')}`;
              return (
                <TableItem key={table.id}>
                  <TableNumber>{tableNumber}</TableNumber>
                  <QRContainer>
                    <QRCodeCanvas
                      id={`qr-${table.id}`}
                      value={table.qrCode}
                      size={128}
                      level="M"
                      includeMargin={true}
                    />
                  </QRContainer>
                  <TableActions>
                    <ActionButton onClick={() => handleDownloadQR(table)}>
                      Download
                    </ActionButton>
                    <ActionButton onClick={() => handlePrintQR(table)}>
                      Print
                    </ActionButton>
                  </TableActions>
                </TableItem>
              );
            })}
          </TablesGrid>
        </TablesCard>
      </Content>
    </Container>
  );
};

export default TableManagementPage;