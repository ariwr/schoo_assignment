function 좌회전 () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 30)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 30)
}
function 우회전 () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 30)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 30)
}
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_RECOGNITION)
let 거리 = 0
basic.forever(function () {
    huskylens.request()
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 30)
    거리 = maqueen.Ultrasonic(PingUnit.Centimeters)
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
        if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 15)
        }
        if (huskylens.isAppear(2, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 0)
        }
        if (huskylens.isAppear(3, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 40)
        }
    } else {
        huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_RECOGNITION)
    }
    if (거리 < 5) {
        maqueen.motorStop(maqueen.Motors.All)
        basic.pause(1000)
        if (randint(1, 2) == 1) {
            좌회전()
        } else {
            우회전()
        }
        basic.pause(500)
    }
})
