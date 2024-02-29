function FixFloat(Float, Precision) {
    Math.round(Float * Math.pow(10, Precision)) / Math.pow(10, Precision);
}
