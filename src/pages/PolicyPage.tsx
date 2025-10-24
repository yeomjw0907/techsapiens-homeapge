import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PolicyContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  padding-top: 80px;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 2rem;
  text-align: center;
`;

const Content = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 3rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.textSecondary};
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
`;

const List = styled.ul`
  margin: 1rem 0;
  padding-left: 2rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const PolicyPage: React.FC = () => {
  return (
    <PolicyContainer>
      <Container>
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          개인정보처리방침
        </Title>
        
        <Content
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Section>
            <SectionTitle>1. 개인정보처리방침의 의의</SectionTitle>
            <Paragraph>
              테크사피엔스(이하 "회사")는 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관련 법령에 따라 이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보처리방침을 수립·공개합니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>2. 개인정보의 처리목적</SectionTitle>
            <Paragraph>회사는 다음의 목적을 위하여 개인정보를 처리합니다:</Paragraph>
            <List>
              <ListItem>서비스 제공 및 계약 이행</ListItem>
              <ListItem>고객 문의 및 상담 응답</ListItem>
              <ListItem>프로젝트 진행 및 관리</ListItem>
              <ListItem>마케팅 및 광고 활용</ListItem>
              <ListItem>법령에 따른 의무 이행</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>3. 개인정보의 처리 및 보유기간</SectionTitle>
            <Paragraph>
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </Paragraph>
            <List>
              <ListItem>고객 문의 정보: 3년</ListItem>
              <ListItem>계약 정보: 계약 종료 후 5년</ListItem>
              <ListItem>마케팅 정보: 동의 철회 시까지</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>4. 개인정보의 제3자 제공</SectionTitle>
            <Paragraph>
              회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>5. 개인정보처리의 위탁</SectionTitle>
            <Paragraph>
              회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:
            </Paragraph>
            <List>
              <ListItem>클라우드 서비스 제공업체 (AWS, Google Cloud 등)</ListItem>
              <ListItem>이메일 발송 서비스 제공업체</ListItem>
              <ListItem>고객 관리 시스템 제공업체</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>6. 정보주체의 권리·의무 및 행사방법</SectionTitle>
            <Paragraph>정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:</Paragraph>
            <List>
              <ListItem>개인정보 처리현황 통지요구</ListItem>
              <ListItem>개인정보 열람요구</ListItem>
              <ListItem>개인정보 정정·삭제요구</ListItem>
              <ListItem>개인정보 처리정지요구</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>7. 개인정보의 안전성 확보조치</SectionTitle>
            <Paragraph>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:</Paragraph>
            <List>
              <ListItem>개인정보 취급 직원의 최소화 및 교육</ListItem>
              <ListItem>개인정보에 대한 접근 제한</ListItem>
              <ListItem>개인정보의 암호화</ListItem>
              <ListItem>해킹 등에 대비한 기술적 대책</ListItem>
              <ListItem>개인정보처리시스템 등의 접근권한 관리</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>8. 개인정보보호책임자</SectionTitle>
            <Paragraph>
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다.
            </Paragraph>
            <Paragraph>
              <strong>개인정보보호책임자</strong><br/>
              성명: 김대표<br/>
              연락처: privacy@techsapiens.com<br/>
              전화: 02-1234-5678
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>9. 개인정보처리방침의 변경</SectionTitle>
            <Paragraph>
              이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>10. 연락처</SectionTitle>
            <Paragraph>
              개인정보 처리에 관한 문의사항이 있으시면 아래 연락처로 연락해 주시기 바랍니다.
            </Paragraph>
            <Paragraph>
              <strong>테크사피엔스</strong><br/>
              주소: 서울특별시 강남구 테헤란로 123<br/>
              전화: 02-1234-5678<br/>
              이메일: info@techsapiens.com<br/>
              웹사이트: https://techsapiens.com
            </Paragraph>
          </Section>

          <Paragraph style={{ marginTop: '3rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
            본 방침은 2024년 1월 1일부터 시행됩니다.
          </Paragraph>
        </Content>
      </Container>
    </PolicyContainer>
  );
};

export default PolicyPage;
