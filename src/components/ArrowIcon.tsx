type ArrowIconProps = {
  direction: 'left' | 'right' | 'up' | 'down'
}

function ArrowIcon({ direction }: ArrowIconProps) {
  const triangle = direction === 'left' ? 'M16 5 6 12l10 7Z' : 'M8 5l10 7-10 7Z'
  const verticalArrow = direction === 'down' ? 'M12 5v14m-6-6 6 6 6-6' : 'M12 19V5m-6 6 6-6 6 6'

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {direction === 'left' || direction === 'right'
        ? <path d={triangle} fill="currentColor" />
        : <path d={verticalArrow} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  )
}

export default ArrowIcon
