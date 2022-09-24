import styled from 'styled-components';

const LineSkeletonContainer = styled.div`
  background-color: #ededed;
  background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 60%
    )
    #ededed;
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1s loading ease-in-out infinite;

  @keyframes loading {
    to {
      background-position-x: -20%;
    }
  }
`;
const LineSkeleton = ({ className }) => {
  return <LineSkeletonContainer className={`w-full rounded-lg ${className}`}></LineSkeletonContainer>;
};

export default LineSkeleton;
