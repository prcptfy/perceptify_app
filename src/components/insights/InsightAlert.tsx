'use client';

type AlertType = 'good' | 'bad';

interface IProps {
  alertType: AlertType;
  text: string;
}

const InsightAlert = (props: IProps) => {
  const textColor = props.alertType == 'good' ? '#004E03' : '#740000';
  const bgColor = props.alertType == 'good' ? '#98DD9B' : '#F9A59D';

  return (
    <div
      style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
      className={
        'rounded-[0.8rem] p-[0.25rem_0.65rem] text-[13px] font-semibold tracking-wide'
      }
    >
      {props.text}
    </div>
  );
};

export default InsightAlert;
