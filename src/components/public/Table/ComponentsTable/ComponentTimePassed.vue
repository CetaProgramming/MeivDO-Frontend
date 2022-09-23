<template>
    <ComponentBaseTableRow :headerItem="headerTitle">
        <p :title="getTime" class="text-center truncate dark:text-white">{{getTime}}</p>
    </ComponentBaseTableRow>
</template>

<script>
    import { isNumber } from '@vueuse/shared';
    import TimePassed from '../../../../helpers/TimePassed';
    import ComponentBaseTableRow from './ComponentBaseTableRow.vue';
    export default {
        data(){
            return {
                time: 0,
                codeTime: '',
                setInterval: {
                    SEC: 0,
                    MIN: 1,
                    HOUR: 2,
                    DAY: null,
                    MONTH: null,
                    YEAR: null
                }
            }
        },
        mounted(){  
            this.setIntervalTime()       
        },
        updated(){
            this.setIntervalTime();
        },
        computed: {
            getTime(){
                return this.item && `At ${this.time} ${this.codeTime} ago`;
            },
            getIntervalTime(){
                return 1000 * (Math.pow(60,this.setInterval[this.codeTime]));
            }
        },
        methods: {
            setIntervalTime(){
                this.calculateTime();
                if(isNumber(this.setInterval[this.codeTime])){
                    const intervalTime = this.getIntervalTime;
                    const time = setInterval(()=> {
                        this.calculateTime();
                        if(intervalTime != this.getIntervalTime){
                            clearInterval(time);
                            this.setIntervalTime();
                        }        
                    }, intervalTime);
                }
            },
            changeValue([time, codeTime]){
                this.time = time;
                this.codeTime = codeTime;
            },
            calculateTime(){
                const timePassedWithString = TimePassed.calculate(this.item); 
                this.changeValue(timePassedWithString);
            }
        },
        props: {
            headerTitle: {
                type: String,
                required: true
            },
            item: {
                required: true
            }
        },
        components: { 
            ComponentBaseTableRow 
        }
    }
</script>